# dsh-persona-gateway

把 DSH 变成一个「带人格与长期记忆的中转」：插件在本机起一个 OpenAI 兼容端点，
任何客户端（AstrBot / Cline / Continue / 其他）指向它，就都带着同一套人格和记忆。

## 用法

1. 装好插件，打开 **设置 → 人格网关**。
2. 填 DeepSeek API Key 和模型名，保存。
3. 把客户端的 base URL 指向 `http://127.0.0.1:8787/v1`，模型名填 `persona`。
4. 人格和记忆都在同一个页面里编辑；对话结束后会自动抽取记忆。

## 数据在哪

`${DSH_HOME:-~/.dsh}/persona/`

```
persona/
  config.json   端口、上游、模型、API Key（0600）
  persona.md    人格，人可读、可 diff
  memory.jsonl  记忆，一行一条
```

整个目录拷走就能迁移；`config.json` 里的 key 建议不跟着走。

## 配置与日志

设置页可以直接改：上游地址、监听端口、模型、API Key、自动记忆开关。

- 改端口会就地重启监听，不用重启 DSH；被占用时页面和日志里都会显示原因。
- 日志记录启动、每个请求注入了多少条记忆、模型记/不记的判断、上游错误，最近 300 条。

## 记忆由 AI 决定

每轮对话结束后，抽取器不只是「提取」，而是逐条判断 `remember` 并给理由，
只有 `true` 的才落盘。被拒绝的候选会以「不记：…（理由）」出现在日志里，
方便你判断这套判断标准是否合口味。

## 限制

- 只有 Chat Completions（`/v1/chat/completions`），没有 Anthropic `/v1/messages`。
- 检索是关键词打分（中文二元组 + 英文词），记忆上千条后再考虑向量。
- 控制面只在回环地址可用。
- API Key 以明文存于 `config.json`，仅本机使用。
