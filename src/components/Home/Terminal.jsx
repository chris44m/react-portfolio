import { useEffect, useState } from 'react'

const command = 'GET /api/christian'

const lines = [
    [{ text: 'HTTP/1.1 200 OK', type: 'status' }],
    [{ text: '{' }],
    [{ text: '  ' }, { text: '"rol"', type: 'key' }, { text: ': ' }, { text: '"Backend & Full Stack Developer"', type: 'string' }, { text: ',' }],
    [{ text: '  ' }, { text: '"stack"', type: 'key' }, { text: ': [' }, { text: '".NET"', type: 'string' }, { text: ', ' }, { text: '"SQL Server"', type: 'string' }, { text: ', ' }, { text: '"PostgreSQL"', type: 'string' }, { text: ', ' }, { text: '"React"', type: 'string' }, { text: '],' }],
    [{ text: '  ' }, { text: '"ubicacion"', type: 'key' }, { text: ': ' }, { text: '"Arequipa, PE"', type: 'string' }],
    [{ text: '}' }],
]

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const Terminal = () => {
    const [typed, setTyped] = useState(() => (prefersReducedMotion() ? command.length : 0))
    const [shown, setShown] = useState(() => (prefersReducedMotion() ? lines.length : 0))

    useEffect(() => {
        if (typed < command.length) {
            const timer = setTimeout(() => setTyped(typed + 1), typed === 0 ? 900 : 70)
            return () => clearTimeout(timer)
        }
        if (shown < lines.length) {
            const timer = setTimeout(() => setShown(shown + 1), shown === 0 ? 450 : 130)
            return () => clearTimeout(timer)
        }
    }, [typed, shown])

    const done = shown === lines.length

    return (
        <div
            className='terminal'
            role='img'
            aria-label='Terminal: GET /api/christian responde 200 OK con rol Backend & Full Stack Developer, stack .NET, SQL Server, PostgreSQL y React, ubicación Arequipa'
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
    )
}

export default Terminal
