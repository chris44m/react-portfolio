import { useEffect, useState } from 'react'
import { apiProfile } from '../../data/profile'

const endpoint = '/api/christian'
const command = `GET ${endpoint}`

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

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const Terminal = () => {
    const [typed, setTyped] = useState(() => (prefersReducedMotion() ? command.length : 0))
    const [shown, setShown] = useState(0)
    const [response, setResponse] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        fetch(endpoint, { signal: controller.signal })
            .then(async (res) => {
                if (!res.ok) throw new Error(String(res.status))
                setResponse({ status: `${res.status} OK`, data: await res.json() })
            })
            .catch((error) => {
                if (error.name !== 'AbortError') setResponse({ status: '200 OK', data: apiProfile })
            })
        return () => controller.abort()
    }, [])

    const lines = buildLines(response?.status ?? '200 OK', response?.data ?? apiProfile)

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

    const done = shown === lines.length

    return (
        <div className='terminal-wrap'>
            <div
                className='terminal'
                role='img'
                aria-label='Terminal que consulta GET /api/christian y muestra el rol, el stack principal, la ubicación y la disponibilidad'
            >
                <div className='terminal-bar'>
                    <span />
                    <span />
                    <span />
                    <p>terminal</p>
                </div>
                <pre className='terminal-body'>
                    <code>
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
                        <span className={done ? 'terminal-line' : 'terminal-line pending'}>
                            <span className='prompt'>$ </span>
                            <span className='cursor' />
                        </span>
                    </code>
                </pre>
            </div>
            <a className='terminal-note' href={endpoint} target='_blank' rel='noreferrer'>
                Esta respuesta es real → ver {endpoint}
            </a>
        </div>
    )
}

export default Terminal
