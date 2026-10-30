window.__ModuleLoader__.load({
  id: 'dsh-persona-gateway',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const lang = (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) || ''
    const zh = /^zh/i.test(lang)

    const T = zh
      ? {
          nav: '人格网关',
          running: '运行中',
          stopped: '未启动',
          endpoint: '客户端地址',
          copy: '复制',
          copied: '已复制',
          persona: '人格',
          personaHint: '保存后下一轮对话立即生效；人格叠加在客户端自带提示词之前，不覆盖它。',
          save: '保存人格',
          saved: '已保存',
          memory: '记忆',
          compact: '压缩',
          compactWait: '压缩中…',
          compactDone: '已压缩：',
          compactNoop: '没有需要整理的内容',
          memoryLimit: '记忆上限',
          limitHint: '超过上限会自动整理；整理后仍超就淘汰最旧的（置顶的除外）',
          autoCompact: '超限自动压缩',
          memoryHint: '由模型判断是否值得记；只有和当前输入相关的记忆才会被注入。',
          addPlaceholder: '手动加一条，例如：用户偏好 Go 而不是 Python',
          add: '添加',
          empty: '还没有记忆。对话几轮后会自动出现。',
          exportBtn: '导出',
          importBtn: '导入',
          exported: '已导出（含人格与记忆，不含 Key）',
          importPersona: '同时导入人格',
          config: '网关配置',
          clientAddress: '客户端地址',
          clientAddressHint: '留空则按监听地址自动生成；走反代或隧道时填对外地址，例如 https://ai.example.com/v1',
          saveAll: '保存全部',
          savedAll: '已全部保存',
          unsaved: '有未保存的修改',
          allSaved: '所有修改已保存',
          listenAddr: '监听地址',
          listenHint: '本机用 127.0.0.1；给局域网里的 AstrBot 用填 0.0.0.0（还需要放行防火墙 8787 端口）。',
          upstream: '上游地址',
          port: '监听端口',
          modelLabel: '模型',
          keyPlaceholder: 'sk-...（已保存过就留空）',
          keySavedStatus: '已保存：sk-…',
          keyNoneStatus: '未保存任何官方 Key（上游凭证为空）',
          clear: '清除',
          cleared: '已清除官方 Key',
          test: '测试连通性',
          testHint: '用当前凭证请求一次上游，确认 Key 有效',
          testOk: '有效 · 上游返回 ',
          testOkTail: ' 个模型',
          testFail: '失败：',
          autoMemory: '自动记忆（由 AI 决定记不记）',
          saveConfig: '保存配置',
          configSaved: '已保存',
          restarting: '正在切换端口…',
          duplicate: '这条已经记过了',
          noKey: '还没填 API Key，客户端调用会返回 401。',
          connect: '把 AstrBot / Cline / Continue 的 base URL 指向上面的地址，模型填 persona。',
          claudeHint: 'Claude Code：ANTHROPIC_BASE_URL 填同一个地址（它会自己拼 /v1/messages）。',
          keys: 'API Key（二级 API）',
          keyHint: '客户端用 Authorization: Bearer 携带。只显示一次，创建后立刻复制。',
          keyNamePlaceholder: '起个名字，例如 AstrBot',
          createKey: '创建 API Key',
          created: '已创建：只显示这一次，离开后无法再查看',
          noKeys: '还没有创建。创建后客户端必须带 Key；现在只允许本机调用。',
          revoke: '撤销',
          neverUsed: '从未使用',
          lastUsed: '最近使用',
          upstreamMissing: '上游没有凭证：在 DSH 登录账号，或填一个 DeepSeek API Key。',
          accountRejected: 'DSH 账号凭证被上游拒绝（401），它不能当 API Key 用。请在网关配置里填一个 DeepSeek API Key。',
          log: '日志',
          logEmpty: '暂时没有日志。',
          refresh: '刷新',
          clearHint: '最近 300 条',
        }
      : {
          nav: 'Persona Gateway',
          running: 'Running',
          stopped: 'Stopped',
          endpoint: 'Client base URL',
          copy: 'Copy',
          copied: 'Copied',
          persona: 'Persona',
          personaHint: 'Applies from the next turn; prepended to the client prompt, never replacing it.',
          save: 'Save persona',
          saved: 'Saved',
          memory: 'Memory',
          compact: 'Compact',
          compactWait: 'Compacting…',
          compactDone: 'Compacted: ',
          compactNoop: 'Nothing to compact',
          memoryLimit: 'Memory limit',
          limitHint: 'Over the limit triggers AI compaction; still over drops the oldest (pinned excluded)',
          autoCompact: 'Auto-compact over limit',
          memoryHint: 'The model decides what is worth remembering; only relevant memories are injected.',
          addPlaceholder: 'Add one, e.g. prefers Go over Python',
          add: 'Add',
          empty: 'No memories yet. They appear after a few turns.',
          exportBtn: 'Export',
          importBtn: 'Import',
          exported: 'Exported (persona and memories, never the key)',
          importPersona: 'Also import persona',
          config: 'Gateway config',
          clientAddress: 'Client address',
          clientAddressHint: 'Empty derives from the listen address; set a public URL behind a tunnel or reverse proxy, e.g. https://ai.example.com/v1',
          saveAll: 'Save all',
          savedAll: 'All saved',
          unsaved: 'Unsaved changes',
          allSaved: 'Everything is saved',
          listenAddr: 'Listen address',
          listenHint: '127.0.0.1 for this machine; 0.0.0.0 for AstrBot on the LAN (allow port 8787 in the firewall).',
          upstream: 'Upstream base URL',
          port: 'Listen port',
          modelLabel: 'Model',
          keyPlaceholder: 'sk-... (leave empty to keep the saved one)',
          keySavedStatus: 'Saved: sk-…',
          keyNoneStatus: 'No official key saved (upstream credential is empty)',
          clear: 'Clear',
          cleared: 'Cleared the official key',
          test: 'Test connection',
          testHint: 'Ask the upstream once with the current credential',
          testOk: 'OK · upstream returned ',
          testOkTail: ' models',
          testFail: 'Failed: ',
          autoMemory: 'Auto memory (AI decides)',
          saveConfig: 'Save config',
          configSaved: 'Saved',
          restarting: 'Switching port…',
          duplicate: 'Already remembered',
          noKey: 'No API key yet; client calls will return 401.',
          connect: 'Point AstrBot / Cline / Continue at the URL above and use the model name persona.',
          claudeHint: 'Claude Code: set ANTHROPIC_BASE_URL to the same address (it appends /v1/messages).',
          keys: 'API Keys (secondary API)',
          keyHint: 'Clients send it as Authorization: Bearer. Shown once, copy it now.',
          keyNamePlaceholder: 'Name it, e.g. AstrBot',
          createKey: 'Create API key',
          created: 'Created: shown once, you cannot see it again',
          noKeys: 'None yet. Once created, clients must send a key; until then only this machine may call.',
          revoke: 'Revoke',
          neverUsed: 'never used',
          lastUsed: 'last used',
          upstreamMissing: 'No upstream credential: sign in to DSH, or set a DeepSeek API key.',
          accountRejected: 'The DSH account credential was rejected by the upstream (401); it is not an API key. Set a DeepSeek API key in the config.',
          log: 'Log',
          logEmpty: 'No entries yet.',
          refresh: 'Refresh',
          clearHint: 'last 300 entries',
        }

    const card = { border: '1px solid rgba(127,127,127,.25)', borderRadius: 12, padding: '14px 16px', marginBottom: 14 }
    const title = { fontSize: 13, fontWeight: 600, marginBottom: 8, opacity: 0.9 }
    const muted = { fontSize: 12, opacity: 0.6, lineHeight: 1.6 }
    const input = {
      flex: 1, minWidth: 0, padding: '7px 10px', borderRadius: 8, font: 'inherit', fontSize: 13,
      border: '1px solid rgba(127,127,127,.3)', background: 'transparent', color: 'inherit',
    }
    const button = {
      padding: '6px 14px', borderRadius: 8, font: 'inherit', fontSize: 13, cursor: 'pointer',
      border: '1px solid rgba(127,127,127,.3)', background: 'rgba(127,127,127,.08)', color: 'inherit',
    }
    const label = { fontSize: 12, opacity: 0.65, minWidth: 76, paddingTop: 7 }
    const row = { display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }

    async function call(sub, init) {
      const res = await fetch('/persona-gw' + sub, { credentials: 'same-origin', ...init })
      const text = await res.text()
      let data = null
      try { data = text ? JSON.parse(text) : null } catch { data = { error: text } }
      if (!res.ok) throw new Error((data && data.error) || ('HTTP ' + res.status))
      return data
    }

    const LEVEL_COLOR = {
      error: '#ef4444',
      memory: '#22c55e',
      skip: '#f59e0b',
      config: '#5b8cff',
      request: 'inherit',
      info: 'inherit',
    }

    function Panel(props) {
      const summary = Boolean(props && props.view === 'summary')
      const [state, setState] = React.useState(null)
      const [logs, setLogs] = React.useState([])
      const [error, setError] = React.useState('')
      const [notice, setNotice] = React.useState('')
      const [busy, setBusy] = React.useState(false)

      const [draft, setDraft] = React.useState('')
      const [memoryText, setMemoryText] = React.useState('')
      const [keyDraft, setKeyDraft] = React.useState('')
      const [modelDraft, setModelDraft] = React.useState('')
      const [portDraft, setPortDraft] = React.useState('')
      const [upstreamDraft, setUpstreamDraft] = React.useState('')
      const [hostDraft, setHostDraft] = React.useState('')
      const [publicBaseDraft, setPublicBaseDraft] = React.useState('')
      const [autoMemory, setAutoMemory] = React.useState(true)
      const [keyName, setKeyName] = React.useState('')
      const [newKeySecret, setNewKeySecret] = React.useState('')
      const [importPersona, setImportPersona] = React.useState(false)
      const [testResult, setTestResult] = React.useState(null)
      const [maxDraft, setMaxDraft] = React.useState('')
      const [autoCompactDraft, setAutoCompactDraft] = React.useState(true)
      const [compacting, setCompacting] = React.useState(false)
      const fileRef = React.useRef(null)

      const flash = (msg) => {
        setNotice(msg)
        setTimeout(() => setNotice(''), 1800)
      }

      const loadLogs = React.useCallback(async () => {
        try {
          const data = await call('/log')
          setLogs(Array.isArray(data.entries) ? data.entries.slice().reverse() : [])
        } catch {
          // 日志读不到不打断主界面
        }
      }, [])

      const load = React.useCallback(async () => {
        try {
          const next = await call('/state')
          setState(next)
          setDraft(next.persona)
          setModelDraft(next.model)
          setPortDraft(String(next.port))
          setHostDraft(next.host || '127.0.0.1')
          setPublicBaseDraft(next.publicBase || '')
          setMaxDraft(String(next.maxMemories || 300))
          setAutoCompactDraft(next.autoCompact !== false)
          setUpstreamDraft(next.upstream)
          setAutoMemory(next.autoMemory !== false)
          setError('')
          void loadLogs()
        } catch (err) {
          setError(String((err && err.message) || err))
        }
      }, [loadLogs])

      React.useEffect(() => { void load() }, [load])

      React.useEffect(() => {
        const timer = setInterval(() => { void loadLogs() }, 4000)
        return () => clearInterval(timer)
      }, [loadLogs])

      const run = async (fn) => {
        if (busy) return
        setBusy(true)
        try { await fn() } catch (err) { setError(String((err && err.message) || err)) } finally { setBusy(false) }
      }

      const savePersona = () => run(async () => {
        await call('/persona', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text: draft }) })
        await load()
        flash(T.saved)
      })

      const addMemory = () => run(async () => {
        const text = memoryText.trim()
        if (!text) return
        const res = await fetch('/persona-gw/memory', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ text }),
        })
        if (res.status === 409) { flash(T.duplicate); return }
        if (!res.ok) throw new Error('HTTP ' + res.status)
        setMemoryText('')
        await load()
        flash(T.saved)
      })

      const removeMemory = (id) => run(async () => {
        await call('/memory/' + id, { method: 'DELETE' })
        await load()
      })

      const saveConfig = () => run(async () => {
        const port = Number(portDraft)
        if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error(zh ? '端口必须是 1-65535 的整数' : 'Port must be 1-65535')
        const patch = {
          port,
          host: hostDraft.trim() || '127.0.0.1',
          publicBase: publicBaseDraft.trim(),
          upstream: upstreamDraft.trim(),
          model: modelDraft.trim(),
          autoMemory,
          maxMemories: Number(maxDraft) || 300,
          autoCompact: autoCompactDraft,
        }
        if (keyDraft.trim()) patch.apiKey = keyDraft.trim()
        if (port !== state.port) flash(T.restarting)
        await call('/config', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(patch) })
        setKeyDraft('')
        await load()
        flash(T.configSaved)
      })

      const saveAll = () => run(async () => {
        const port = Number(portDraft)
        if (!Number.isInteger(port) || port < 1 || port > 65535) {
          throw new Error(zh ? '端口必须是 1-65535 的整数' : 'Port must be 1-65535')
        }
        await call('/persona', {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ text: draft }),
        })
        const patch = {
          host: hostDraft.trim() || '127.0.0.1',
          port,
          publicBase: publicBaseDraft.trim(),
          upstream: upstreamDraft.trim(),
          model: modelDraft.trim(),
          autoMemory,
          maxMemories: Number(maxDraft) || 300,
          autoCompact: autoCompactDraft,
        }
        if (keyDraft.trim()) patch.apiKey = keyDraft.trim()
        await call('/config', {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(patch),
        })
        setKeyDraft('')
        await load()
        flash(T.savedAll)
      })

      const clearKey = () => run(async () => {
        await call('/config', {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ apiKey: '' }),
        })
        setKeyDraft('')
        await load()
        flash(T.cleared)
      })

      const testUpstream = () => run(async () => {
        setTestResult({ ok: true, message: '…' })
        try {
          const res = await call('/test', { method: 'POST' })
          setTestResult(res.ok
            ? { ok: true, message: T.testOk + res.models + T.testOkTail }
            : { ok: false, message: T.testFail + (res.message || res.status) })
        } catch (err) {
          setTestResult({ ok: false, message: T.testFail + String((err && err.message) || err) })
        }
        await load()
      })

      const copyEndpoint = async () => {
        const bindAll = state.host === '0.0.0.0'
        const url = state.clientBase || ('http://' + (bindAll ? ((state.addresses && state.addresses[0]) || '127.0.0.1') : state.host) + ':' + state.port + '/v1')
        try {
          await navigator.clipboard.writeText(url)
          flash(T.copied)
        } catch {
          flash(url)
        }
      }

      const copyText = async (text) => {
        try {
          await navigator.clipboard.writeText(text)
          flash(T.copied)
        } catch {
          flash(text)
        }
      }

      const createKey = () => run(async () => {
        const data = await call('/keys', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ name: keyName }),
        })
        setNewKeySecret(data.key)
        setKeyName('')
        await load()
      })

      const revokeKey = (id) => run(async () => {
        await call('/keys/' + id, { method: 'DELETE' })
        await load()
      })

      const compactNow = () => run(async () => {
        setCompacting(true)
        try {
          const res = await call('/compact', { method: 'POST' })
          if (res.ok) {
            await load()
            flash(T.compactDone + res.before + ' → ' + res.after)
          } else {
            flash(res.message || T.compactNoop)
          }
        } finally {
          setCompacting(false)
        }
      })

      const exportPack = () => run(async () => {
        const data = await call('/export')
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'persona-pack-' + new Date().toISOString().slice(0, 10) + '.json'
        document.body.appendChild(link)
        link.click()
        link.remove()
        setTimeout(() => URL.revokeObjectURL(url), 1000)
        flash(T.exported)
      })

      const importFile = async (event) => {
        const file = event.target.files && event.target.files[0]
        event.target.value = ''
        if (!file) return
        await run(async () => {
          const text = await file.text()
          const res = await call('/import', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ text, applyPersona: importPersona }),
          })
          await load()
          flash(zh
            ? '导入 ' + res.added + ' 条，跳过 ' + res.skipped + ' 条重复'
            : res.added + ' imported, ' + res.skipped + ' skipped')
        })
      }

      if (!state) {
        if (summary) return h('span', { style: muted }, '…')
        return h('div', { style: { padding: 8 } },
          h('div', { style: title }, T.nav),
          h('div', { style: muted }, error || '…'))
      }

      // 插件列表里只占一行，别把整页塞进去
      if (summary) {
        return h('span', { style: muted },
          (state.running ? T.running : T.stopped) + ' · 127.0.0.1:' + state.port +
          ' · ' + state.memories.length + (zh ? ' 条记忆' : ' memories'))
      }

      const dot = {
        width: 8, height: 8, borderRadius: 4, display: 'inline-block',
        background: state.running ? '#22c55e' : (state.error ? '#ef4444' : '#f59e0b'),
      }

      const bindAll = state.host === '0.0.0.0'
      const endpointUrl = state.clientBase || ('http://' + (bindAll ? ((state.addresses && state.addresses[0]) || '127.0.0.1') : state.host) + ':' + state.port + '/v1')
      const dirty = draft !== state.persona
        || hostDraft !== state.host
        || portDraft !== String(state.port)
        || publicBaseDraft !== (state.publicBase || '')
        || upstreamDraft !== state.upstream
        || modelDraft !== state.model
        || autoMemory !== (state.autoMemory !== false)
        || maxDraft !== String(state.maxMemories)
        || autoCompactDraft !== (state.autoCompact !== false)
        || keyDraft.trim() !== ''

      const logRows = logs.map((entry, index) => h('div', {
        key: entry.ts + ':' + index,
        style: {
          display: 'flex', gap: 8, padding: '3px 0', fontSize: 12, lineHeight: 1.55,
          color: LEVEL_COLOR[entry.level] || 'inherit',
          opacity: entry.level === 'info' || entry.level === 'request' ? 0.75 : 1,
        },
      },
        h('span', { style: { opacity: 0.45, fontFamily: 'ui-monospace, monospace', whiteSpace: 'nowrap' } },
          new Date(entry.ts).toLocaleTimeString(zh ? 'zh-CN' : 'en-GB', { hour12: false })),
        h('span', { style: { wordBreak: 'break-word' } }, entry.message)))

      return h('div', { style: { padding: '4px 2px 24px' } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
          h('span', { style: dot }),
          h('span', { style: { fontSize: 14, fontWeight: 600 } }, T.nav),
          h('span', { style: muted }, state.running ? T.running : T.stopped)),
        state.error ? h('div', { style: { ...muted, color: '#ef4444', marginBottom: 8 } }, state.error) : null,
        notice ? h('div', { style: { ...muted, color: '#22c55e', marginBottom: 8 } }, notice) : null,
        error ? h('div', { style: { ...muted, color: '#ef4444', marginBottom: 8 } }, error) : null,

        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, padding: '2px 0 10px' } },
          h('span', { style: { ...muted, color: dirty ? '#f59e0b' : undefined } }, dirty ? T.unsaved : T.allSaved),
          h('span', { style: { flex: 1 } }),
          h('button', { style: { ...button, fontWeight: 600 }, onClick: saveAll, disabled: busy || !dirty }, T.saveAll)),

        h('div', { style: card },
          h('div', { style: title }, T.endpoint),
          h('div', { style: row },
            h('code', { style: { ...input, fontFamily: 'ui-monospace, monospace', padding: '7px 10px' } }, endpointUrl),
            h('button', { style: button, onClick: copyEndpoint }, T.copy)),
          bindAll ? h('div', { style: { ...muted, marginTop: 6 } }, '本机仍可用 http://127.0.0.1:' + state.port + '/v1') : null,
          h('div', { style: { ...muted, marginTop: 8 } }, T.connect),
          h('div', { style: { ...muted, marginTop: 4 } }, T.claudeHint)),

        !state.upstreamReady ? h('div', { style: { ...card, borderColor: 'rgba(245,158,11,.5)' } },
          h('div', { style: { ...muted, color: '#f59e0b' } },
            state.accountRejected ? T.accountRejected : T.upstreamMissing)) : null,

        h('div', { style: card },
          h('div', { style: title }, T.keys),
          h('div', { style: { ...muted, marginBottom: 8 } }, T.keyHint),
          state.keys.length === 0
            ? h('div', { style: { ...muted, color: '#f59e0b', marginBottom: 8 } }, T.noKeys)
            : h('ul', { style: { listStyle: 'none', padding: 0, margin: '0 0 8px' } },
                state.keys.map((k) => h('li', {
                  key: k.id,
                  style: { display: 'flex', gap: 10, alignItems: 'center', padding: '7px 0', borderTop: '1px solid rgba(127,127,127,.15)' },
                },
                  h('span', { style: { fontSize: 12, minWidth: 90, opacity: 0.75 } }, k.name),
                  h('code', { style: { flex: 1, fontSize: 12, fontFamily: 'ui-monospace, monospace' } }, k.prefix + '…' + k.tail),
                  h('span', { style: { fontSize: 11, opacity: 0.45 } },
                    k.lastUsedAt ? T.lastUsed + ' ' + new Date(k.lastUsedAt).toLocaleString() : T.neverUsed),
                  h('button', { style: { ...button, padding: '3px 10px' }, onClick: () => revokeKey(k.id) }, T.revoke)))),
          newKeySecret
            ? h('div', { style: { border: '1px dashed rgba(34,197,94,.6)', borderRadius: 8, padding: '10px 12px', marginBottom: 8 } },
                h('div', { style: { ...muted, marginBottom: 6 } }, T.created),
                h('div', { style: row },
                  h('code', { style: { ...input, fontFamily: 'ui-monospace, monospace', fontSize: 12, wordBreak: 'break-all' } }, newKeySecret),
                  h('button', { style: button, onClick: () => copyText(newKeySecret) }, T.copy)))
            : null,
          h('div', { style: row },
            h('input', {
              value: keyName,
              onChange: (e) => setKeyName(e.target.value),
              placeholder: T.keyNamePlaceholder,
              style: input,
            }),
            h('button', { style: button, onClick: createKey, disabled: busy }, T.createKey))),

        h('div', { style: card },
          h('div', { style: title }, T.persona),
          h('textarea', {
            value: draft,
            onChange: (e) => setDraft(e.target.value),
            spellCheck: false,
            style: {
              width: '100%', minHeight: 140, boxSizing: 'border-box', padding: '10px 12px',
              borderRadius: 8, font: 'inherit', fontSize: 13, lineHeight: 1.6, resize: 'vertical',
              border: '1px solid rgba(127,127,127,.3)', background: 'transparent', color: 'inherit',
            },
          }),
          h('div', { style: row },
            h('button', { style: button, onClick: savePersona, disabled: busy }, T.save),
            h('span', { style: muted }, T.personaHint))),

        h('div', { style: card },
          h('div', { style: { ...title, display: 'flex', alignItems: 'center', gap: 8 } },
            h('span', null, T.memory + ' (' + state.memories.length + ' / ' + state.maxMemories + ')'),
            h('span', { style: { flex: 1 } }),
            h('button', { style: { ...button, padding: '3px 10px' }, onClick: compactNow, disabled: busy || compacting || state.memories.length < 4 }, compacting ? T.compactWait : T.compact),
            h('button', { style: { ...button, padding: '3px 10px' }, onClick: exportPack, disabled: busy }, T.exportBtn),
            h('button', { style: { ...button, padding: '3px 10px' }, onClick: () => fileRef.current && fileRef.current.click(), disabled: busy }, T.importBtn),
            h('input', {
              ref: fileRef,
              type: 'file',
              accept: '.json,.jsonl,.txt',
              style: { display: 'none' },
              onChange: importFile,
            })),
          h('label', { style: { ...muted, display: 'flex', alignItems: 'center', gap: 6, marginTop: 2, cursor: 'pointer' } },
            h('input', { type: 'checkbox', checked: importPersona, onChange: (e) => setImportPersona(e.target.checked) }),
            T.importPersona),
          h('div', { style: row },
            h('input', {
              value: memoryText,
              onChange: (e) => setMemoryText(e.target.value),
              onKeyDown: (e) => { if (e.key === 'Enter') addMemory() },
              placeholder: T.addPlaceholder,
              style: input,
            }),
            h('button', { style: button, onClick: addMemory, disabled: busy }, T.add)),
          h('div', { style: { ...muted, marginTop: 8 } }, T.memoryHint),
          state.memories.length === 0
            ? h('div', { style: { ...muted, marginTop: 10 } }, T.empty)
            : h('ul', { style: { listStyle: 'none', padding: 0, margin: '10px 0 0' } },
                state.memories.map((m) => h('li', {
                  key: m.id,
                  style: { display: 'flex', gap: 10, alignItems: 'flex-start', padding: '7px 0', borderTop: '1px solid rgba(127,127,127,.15)' },
                },
                  h('span', { style: { fontSize: 11, opacity: 0.45, minWidth: 62, paddingTop: 2 } }, m.kind || 'fact'),
                  h('span', { style: { flex: 1, fontSize: 13, lineHeight: 1.6 } }, m.text),
                  h('button', {
                    style: { border: 'none', background: 'none', cursor: 'pointer', opacity: 0.45, color: 'inherit', fontSize: 13 },
                    onClick: () => removeMemory(m.id),
                    title: 'delete',
                  }, '✕'))))),

        h('div', { style: card },
          h('div', { style: title }, T.config),
          h('div', { style: row },
            h('span', { style: label }, T.clientAddress),
            h('input', {
              value: publicBaseDraft,
              onChange: (e) => setPublicBaseDraft(e.target.value),
              placeholder: 'https://ai.example.com/v1',
              style: input,
            })),
          h('div', { style: { ...muted, marginBottom: 6 } }, T.clientAddressHint),
          h('div', { style: row },
            h('span', { style: label }, T.listenAddr),
            h('input', {
              value: hostDraft,
              onChange: (e) => setHostDraft(e.target.value),
              style: { ...input, maxWidth: 160, flex: 'none' },
            })),
          h('div', { style: { ...muted, marginBottom: 4 } }, T.listenHint),
          h('div', { style: row },
            h('span', { style: label }, T.upstream),
            h('input', { value: upstreamDraft, onChange: (e) => setUpstreamDraft(e.target.value), style: input })),
          h('div', { style: row },
            h('span', { style: label }, T.port),
            h('input', {
              value: portDraft,
              onChange: (e) => setPortDraft(e.target.value.replace(/[^0-9]/g, '')),
              inputMode: 'numeric',
              style: { ...input, maxWidth: 120, flex: 'none' },
            }),
            h('span', { style: label }, T.modelLabel),
            h('input', { value: modelDraft, onChange: (e) => setModelDraft(e.target.value), style: input })),
          h('div', { style: row },
            h('span', { style: label }, 'API Key'),
            h('input', {
              value: keyDraft,
              onChange: (e) => setKeyDraft(e.target.value),
              placeholder: state.hasKey ? T.keySavedStatus + state.keyTail : 'sk-...',
              type: 'password',
              style: input,
            }),
            state.hasKey
              ? h('button', { style: { ...button, padding: '4px 10px' }, onClick: clearKey, disabled: busy }, T.clear)
              : null),
          h('div', { style: { ...muted, marginTop: 2, color: state.hasKey ? '#22c55e' : '#f59e0b' } },
            state.hasKey ? T.keySavedStatus + state.keyTail : T.keyNoneStatus),
          h('div', { style: { ...row, marginTop: 6 } },
            h('button', { style: { ...button, padding: '4px 10px' }, onClick: testUpstream, disabled: busy }, T.test),
            testResult
              ? h('span', { style: { fontSize: 12, color: testResult.ok ? '#22c55e' : '#ef4444', wordBreak: 'break-word' } }, testResult.message)
              : h('span', { style: muted }, T.testHint)),
          h('div', { style: row },
            h('span', { style: label }, T.memoryLimit),
            h('input', {
              value: maxDraft,
              onChange: (e) => setMaxDraft(e.target.value.replace(/[^0-9]/g, '')),
              inputMode: 'numeric',
              style: { ...input, maxWidth: 100, flex: 'none' },
            }),
            h('label', { style: { ...muted, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' } },
              h('input', { type: 'checkbox', checked: autoCompactDraft, onChange: (e) => setAutoCompactDraft(e.target.checked) }),
              T.autoCompact)),
          h('div', { style: { ...muted, marginBottom: 4 } }, T.limitHint),
          h('div', { style: { ...row, marginTop: 10 } },
            h('label', { style: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' } },
              h('input', { type: 'checkbox', checked: autoMemory, onChange: (e) => setAutoMemory(e.target.checked) }),
              T.autoMemory),
            h('span', { style: { flex: 1 } }),
            h('button', { style: button, onClick: saveConfig, disabled: busy }, T.saveConfig))),

        h('div', { style: card },
          h('div', { style: { ...title, display: 'flex', alignItems: 'center', gap: 8 } },
            h('span', null, T.log),
            h('span', { style: muted }, T.clearHint),
            h('span', { style: { flex: 1 } }),
            h('button', { style: { ...button, padding: '3px 10px' }, onClick: () => { void loadLogs() } }, T.refresh)),
          h('div', { style: { maxHeight: 220, overflowY: 'auto', marginTop: 6, fontFamily: 'ui-monospace, monospace' } },
            logRows.length ? logRows : h('div', { style: muted }, T.logEmpty))))
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('settings.section', () => ctx.slots.register({
          name: 'settings.section',
          id: 'persona-gateway',
          order: 40,
          label: () => T.nav,
        }, Panel))

        // 同一个面板也挂到「插件」页，避免那一页看起来没有任何配置。
        try {
          ctx.slots.inject('plugins.bundle.config', () => ctx.slots.register({
            name: 'plugins.bundle.config',
            key: 'dsh-persona-gateway',
          }, Panel))
        } catch {
          // 该插槽不存在时只保留设置页
        }
      },
    }
  },
})
