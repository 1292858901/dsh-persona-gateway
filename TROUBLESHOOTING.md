# 安装故障排查：`ERR_PNPM_EPERM` rename 失败

## 现象

在插件管理界面点安装，失败并提示 **「没有写入权限，无法安装」**，安装详情里是：

```
[ERR_PNPM_EPERM] [importPackage C:\Users\<你的用户名>\.dsh\profiles\desktop\node_modules\dsh-persona-gateway]
EPERM: operation not permitted,
rename '...\node_modules\dsh-persona-gateway_tmp_1600_7'
    -> '...\node_modules\dsh-persona-gateway'
退出码 1
```

偶尔还会先出现一行：

```
[WARN] Moving dsh-persona-gateway_tmp_19156_3 to "node_modules\.ignored\..."
       It is not in the dependency tree and pnpm has no record of installing it.
```

先重试几次通常无效，失败日志里的 `_tmp_` 后缀每次都会变。

## 这只发生在什么情况下

三个条件**同时**满足才复现：

| # | 条件 | 怎么来的 |
|---|---|---|
| 1 | `node_modules/dsh-persona-gateway` 是**符号链接**，不是实体目录 | 曾用本地目录安装（`install_bundle` 指向工作区，产生 `link:` 依赖） |
| 2 | 它**已不在** `package.json` 依赖里 | 在插件界面点过卸载；DSH 会删依赖行，但不删那个它不拥有的链接 |
| 3 | 再次安装 | pnpm 下载完成后 `rename(tmp → 目标)`，目标是个 reparse point，Windows 拒绝 |

也就是说：**从 git / npm 安装 → 卸载 → 再装，不会复现**；只有「本地目录装过 → 卸载 → 换源安装」才会。

这不是插件代码的问题。失败发生在 pnpm 安装这一步，你的 `index.js` 根本还没被加载；pnpm 对**实体目录**有正常的「先挪到 `.ignored/` 再 rename」逻辑，唯独对不是它创建的符号链接没有。

## 如何复现（Windows）

```powershell
# 1. 用本地目录安装，制造符号链接
#    在 DSH 里 install_bundle 指向本地仓库，或：
dsh plugin --profile desktop add link:C:/path/to/dsh-persona-gateway

# 2. 确认它是个链接
Get-Item "$env:USERPROFILE\.dsh\profiles\desktop\node_modules\dsh-persona-gateway" |
  Select-Object Name, LinkType, Target
# LinkType: SymbolicLink

# 3. 卸载（依赖行被删，链接还在）
# 4. 改从 git 安装
pnpm add https://github.com/<你的用户名>58901/dsh-persona-gateway --registry=https://registry.npmmirror.com/
# → ERR_PNPM_EPERM ... rename ..._tmp_xxx -> dsh-persona-gateway
```

## 如何解决

### 一步解决（推荐）

删掉那个模块路径，再点一次安装：

```powershell
Remove-Item "$env:USERPROFILE\.dsh\profiles\desktop\node_modules\dsh-persona-gateway" -Recurse -Force
```

顺带清掉可能残留的临时目录（可选）：

```powershell
Get-ChildItem "$env:USERPROFILE\.dsh\profiles\desktop\node_modules" |
  Where-Object Name -Like 'dsh-persona-gateway_tmp_*' |
  Remove-Item -Recurse -Force
```

然后重新安装：

```bash
dsh plugin --profile desktop add github:<你的用户名>58901/dsh-persona-gateway
```

### 验证装对了

```powershell
Get-Item "$env:USERPROFILE\.dsh\profiles\desktop\node_modules\dsh-persona-gateway" |
  Select-Object LinkType, Target
# LinkType 为空 = 实体目录，正确
```

`package.json` 里应当是：

```json
"dsh-persona-gateway": "git+https://github.com/<你的用户名>58901/dsh-persona-gateway.git"
```

而不是 `"link:C:/..."`。

## 预防

- **普通使用只走 git 或 npm 安装**，不要对同一 profile 用本地目录安装
- 本地调试改用 `link:` 之后，切回正式安装前先执行上面那条 `Remove-Item`
- 换安装源（本地 ↔ git ↔ npm）之前，一律先确认该路径不存在

## 相关

- pnpm 在 Windows 上对 reparse point 执行 rename 的已知行为：[pnpm install: ERR_PNPM_LINKING_FAILED](https://stackoverflow.com/questions/77180619/pnpm-install-err-pnpm-linking-failed-operation-not-permitted-rename)
- npm 同类问题：[npm/cli#9021](https://github.com/npm/cli/issues/9021)
