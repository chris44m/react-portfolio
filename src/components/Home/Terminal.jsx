import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiProfile } from '../../data/profile'
import { complete, jsonLines, runCommand } from './terminalCommands'

const endpoint = '/api/christian'
const command = `GET ${endpoint}`
const shortcuts = ['help', 'stack', 'proyectos', 'contacto']

const string = (value) => ({ text: JSON.stringify(value), type: 'string' })
const key = (name) => ({ text: `"${name}"`, type: 'key' })
const plain = (text) => ({ text })

const buildLines = (status, data) => [
    [{ text: `HTTP/1.1 ${status}`, type: status.startsWith('2') ? 'status' : 'error' }],
    [plain('{')],
    [plain('  '), key('rol'), plain(': '), string(data.rol), plain(',')],
    [
        plain('  '), key('stack'), plain(': ['),
        ...data.stackPrincipal.flatMap((item, index) => index === 0 ? [string(item)] : [plain(', '), string(item)]),
        plain('],'),
    ],
    [plain('  '), key('ubicacion'), plain(': '), string(data.ubicacion), plain(',')],
    [plain('  '), key('disponible'), plain(': '), { text: String(data.disponible), type: 'bool' }],
    [plain('}')],
]

const fetchProfile = async (signal) => {
    const res = await fetch(endpoint, { signal })
    if (!res.ok) throw new Error(String(res.status))
    return { status: `${res.status} OK`, data: await res.json() }
}

const renderLine = (segments, index) => (
    <span key={index} className='terminal-line'>
        {segments.map((segment, i) =>
            segment.type === 'link' ? (
                <a key={i} className='link' href={segment.href} target={segment.href.startsWith('mailto') ? undefined : '_blank'} rel='noreferrer'>
                    {segment.text}
                </a>
            ) : (
                <span key={i} className={segment.type}>{segment.text}</span>
            )
        )}
    </span>
)

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const Terminal = () => {
    const navigate = useNavigate()
    const [typed, setTyped] = useState(() => (prefersReducedMotion() ? command.length : 0))
    const [shown, setShown] = useState(0)
    const [response, setResponse] = useState(null)
    const [entries, setEntries] = useState([])
    const [cleared, setCleared] = useState(false)
    const [input, setInput] = useState('')
    const [busy, setBusy] = useState(false)
    const history = useRef([])
    const historyIndex = useRef(0)
    const nextId = useRef(0)
    const inputRef = useRef(null)
    const bodyRef = useRef(null)

    useEffect(() => {
        const controller = new AbortController()
        fetchProfile(controller.signal)
            .then(setResponse)
            .catch((error) => {
                if (error.name !== 'AbortError') setResponse({ status: '200 OK', data: apiProfile })
            })
        return () => controller.abort()
    }, [])

    const data = response?.data ?? apiProfile
    const lines = buildLines(response?.status ?? '200 OK', data)

    useEffect(() => {
        if (typed < command.length) {
            const timer = setTimeout(() => setTyped(typed + 1), typed === 0 ? 900 : 70)
            return () => clearTimeout(timer)
        }
        if (!response || shown >= lines.length) return
        if (prefersReducedMotion()) {
            setShown(lines.length)
            return
        }
        const timer = setTimeout(() => setShown(shown + 1), shown === 0 ? 450 : 130)
        return () => clearTimeout(timer)
    }, [typed, shown, response, lines.length])

    useEffect(() => {
        const body = bodyRef.current
        if (body) body.scrollTop = body.scrollHeight
    }, [entries, cleared])

    const done = shown === lines.length

    const push = (raw, output) => {
        setEntries((previous) => [...previous, { id: nextId.current++, input: raw, lines: output }])
    }

    const execute = async (raw) => {
        if (raw.trim()) history.current.push(raw)
        historyIndex.current = history.current.length

        const result = runCommand(raw, data)

        if (result.action?.type === 'clear') {
            setEntries([])
            setCleared(true)
            return
        }

        if (result.action?.type === 'fetch') {
            setBusy(true)
            try {
                const fresh = await fetchProfile()
                push(raw, [[{ text: `HTTP/1.1 ${fresh.status}`, type: 'status' }], ...jsonLines(fresh.data)])
            } catch {
                push(raw, [[{ text: `No se pudo consultar ${endpoint}.`, type: 'error' }]])
            }
            setBusy(false)
            return
        }

        push(raw, result.lines)
        if (result.action?.type === 'navigate') navigate(result.action.to)
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const value = input
            setInput('')
            execute(value)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (historyIndex.current > 0) {
                historyIndex.current -= 1
                setInput(history.current[historyIndex.current])
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (historyIndex.current < history.current.length - 1) {
                historyIndex.current += 1
                setInput(history.current[historyIndex.current])
            } else {
                historyIndex.current = history.current.length
                setInput('')
            }
        } else if (e.key === 'Tab') {
            e.preventDefault()
            setInput(complete(input))
        }
    }

    const focusInput = () => {
        if (window.getSelection()?.toString()) return
        inputRef.current?.focus({ preventScroll: true })
    }

    return (
        <div className='terminal-wrap'>
            <div className='terminal' role='region' aria-label='Terminal interactiva' onClick={focusInput}>
                <div className='terminal-bar'>
                    <span />
                    <span />
                    <span />
                    <p>terminal</p>
                </div>
                <div className='terminal-body' ref={bodyRef}>
                    {!cleared && (
                        <>
                            <span className='terminal-line'>
                                <span className='prompt'>$ </span>
                                {command.slice(0, typed)}
                                {typed < command.length && <span className='cursor' />}
                            </span>
                            {lines.map((segments, index) => (
                                <span key={index} className={index < shown ? 'terminal-line' : 'terminal-line pending'}>
                                    {segments.map((segment, i) => (
                                        <span key={i} className={segment.type}>{segment.text}</span>
                                    ))}
                                </span>
                            ))}
                        </>
                    )}
                    <div aria-live='polite'>
                        {entries.map((entry) => (
                            <Fragment key={entry.id}>
                                <span className='terminal-line'>
                                    <span className='prompt'>$ </span>
                                    {entry.input}
                                </span>
                                {entry.lines.map(renderLine)}
                            </Fragment>
                        ))}
                    </div>
                    {done ? (
                        <label className='terminal-line terminal-input'>
                            <span className='prompt'>$ </span>
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={onKeyDown}
                                disabled={busy}
                                aria-label='Escribe un comando'
                                placeholder={entries.length === 0 && !cleared ? 'escribe "help"' : ''}
                                spellCheck={false}
                                autoComplete='off'
                                autoCapitalize='off'
                                autoCorrect='off'
                            />
                        </label>
                    ) : (
                        <span className='terminal-line pending'>
                            <span className='prompt'>$ </span>
                        </span>
                    )}
                </div>
            </div>
            <div className='terminal-footer'>
                <div className='terminal-shortcuts'>
                    {shortcuts.map((shortcut) => (
                        <button key={shortcut} type='button' onClick={() => execute(shortcut)} disabled={!done || busy}>
                            {shortcut}
                        </button>
                    ))}
                </div>
                <a className='terminal-note' href={endpoint} target='_blank' rel='noreferrer'>
                    Esta respuesta es real → ver {endpoint}
                </a>
            </div>
        </div>
    )
}

export default Terminal
