# dsh-persona-gateway

把 DeepSeek Harness 变成一个「带人格与长期记忆的 OpenAI 兼容中转」：插件在本机起一个端点，
AstrBot / Cline / Continue / iShellPro 之类的客户端指过来，就都带着同一套人格和记忆。

## 它解决什么

客户端的 system prompt 各写各的，记忆更是互不相通——在 AstrBot 聊过的偏好，换个 IDE 就归零。
这个插件把「人格 + 记忆」搬到网关层：客户端只换一个 base URL，人格和长期记忆跟着人走。

- **人格**：稳定前缀，叠加在客户端自带提示词之前，不覆盖它
- **记忆**：对话后由 AI 判断是否值得记；下一轮按相关性注入，不整库塞进去
- **可迁移**：整套状态就是 `~/.dsh/persona/` 一个目录

## 安装

需要 DSH 0.2.0 及以上。

```bash
dsh plugin --profile desktop add github:1292858901/dsh-persona-gateway
```

插件市场里的安装按钮走的也是这条 git 命令。

> **推荐只用这一种方式。** 不要对同一个 profile 用 `install_bundle` 指向本地目录——
> 那条路会把 `node_modules/dsh-persona-gateway` 变成符号链接，之后换回 git / npm
> 安装时 pnpm 无法覆盖它，会报 `ERR_PNPM_EPERM ... rename`。
> 已经踩到请直接看 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)，一行命令解决。

装好后打开 **设置 → 人格网关**（「插件」页里的同一张卡片也是同一个面板）。

## 快速开始

1. **填官方 Key**：网关调用 `api.deepseek.com` 需要 DeepSeek API Key。点「测试连通性」确认有效。
   DSH 的登录凭证不能直接当 API Key 用（会被上游 401），所以这里必须填一个。
2. **创建二级 Key**：给客户端用的 `sk-l2-…`，只显示一次。
3. **改客户端配置**：
   - Base URL：面板上的「客户端地址」，例如 `http://192.168.0.58:8787/v1`
   - API Key：上一步的 `sk-l2-…`
   - 模型：`persona`（推荐，会走网关配置的模型）
4. **验证**：发一句话，回面板看日志有没有 `request … 注入 N 条记忆`。

## 网关配置

| 项 | 说明 |
|---|---|
| 客户端地址 | 留空按监听地址自动生成；走反代/隧道时填对外地址 |
| 监听地址 | `127.0.0.1` 只本机；`0.0.0.0` 允许局域网（需要放行防火墙端口） |
| 端口 | 默认 8787，改动即时重启监听 |
| 上游地址 | 默认 `https://api.deepseek.com/v1` |
| 记忆上限 | 默认 300 条，超过触发 AI 压缩，仍超则淘汰最旧的 |
| 自动记忆 | 关闭后不再抽取，也不会有新记忆 |

## 记忆

- 存于 `~/.dsh/persona/memory.jsonl`，一行一条，可 diff
- 每轮只注入相关的 4 条、900 字符以内
- 抽取有节流：一分钟最多一次，寒暄和短回答直接跳过
- 「压缩」按钮让模型合并重复、删除过时条目；置顶条目不参与压缩
- 支持导入导出（JSON 包 / 裸数组 / 原始 jsonl 都认），自动去重

## 数据与隐私

```
~/.dsh/persona/
  config.json    上游、端口、模型、官方 Key（0600）
  persona.md     人格
  memory.jsonl   记忆
```

- 官方 Key 与控制面只在本机回环可用；控制面路径 `/persona-gw/*` 拒绝非回环请求
- 记忆是明文，可能包含服务器地址之类的敏感信息，导出分享前请自己检查
- 二级 Key 只存 SHA-256 哈希，面板只能看到前缀和尾号

## 兼容 Anthropic 的客户端

Claude Code 这类走 Anthropic Messages 协议的客户端也能接，网关透传到
DeepSeek 的 Anthropic 兼容端点（`https://api.deepseek.com/anthropic`）：

```bash
export ANTHROPIC_BASE_URL=http://192.168.0.58:8787   # 结尾不要加 /v1
export ANTHROPIC_AUTH_TOKEN=sk-l2-...
```

人格注入 `system`，记忆注入最后一条 user 消息。

## 本地开发

需要「改完即刻生效」时，才用本地目录安装（会产生符号链接）：

```bash
dsh plugin --profile desktop add link:C:/path/to/dsh-persona-gateway
```

**切回正式安装前，先删掉这一行**，否则会命中 `EPERM`：

```powershell
Remove-Item "$env:USERPROFILE\.dsh\profiles\desktop\node_modules\dsh-persona-gateway" -Recurse -Force
```

## 已知限制

- 检索是关键词打分（中文二元组 + 英文词），不依赖 embedding
- 记忆不能跨设备自动同步，迁移靠导出/导入或拷贝目录
- Anthropic 侧只从 `text_delta` 收集文本用于记忆抽取，`tool_use` 原样透传不参与

## 安装失败

`ERR_PNPM_EPERM ... rename ..._tmp_xxx -> dsh-persona-gateway` / 提示「没有写入权限」：
见 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)，一行命令可解。

## License

MIT
