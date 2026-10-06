const segment = (text, type) => ({ text, type })
const link = (text, href) => ({ text, type: 'link', href })
const pad = (text, size) => text.padEnd(size, ' ')

export const sections = ['sobre-mi', 'proyectos', 'contacto']

export const commandNames = ['help', 'whoami', 'stack', 'experiencia', 'proyectos', 'contacto', 'ir', 'cv', 'curl', 'clear']

const helpRows = [
    ['help', 'lista los comandos'],
    ['whoami', 'nombre, título y rol'],
    ['stack', 'stack completo por categoría'],
    ['experiencia', 'empresas, cargos y fechas'],
    ['proyectos', 'proyectos y su stack'],
    ['contacto', 'correo, LinkedIn y GitHub'],
    ['ir <sección>', 'sobre-mi · proyectos · contacto'],
    ['cv', 'abre la página del CV'],
    ['curl', 'consulta GET /api/christian'],
    ['clear', 'limpia la terminal'],
]

const stackLabels = {
    lenguajes: 'lenguajes',
    backend: 'backend',
    frontend: 'frontend',
    basesDeDatos: 'bases de datos',
    herramientas: 'herramientas',
}

const jsonValue = (value) => {
    if (value.startsWith('"')) return segment(value, 'string')
    if (/^(true|false|null)/.test(value)) return segment(value, 'bool')
    return segment(value)
}

export const jsonLines = (data) =>
    JSON.stringify(data, null, 2).split('\n').map((line) => {
        const pair = line.match(/^(\s*)("(?:[^"\\]|\\.)*")(: )(.*)$/)
        if (pair) return [segment(pair[1]), segment(pair[2], 'key'), segment(pair[3]), jsonValue(pair[4])]
        const [, indent, rest] = line.match(/^(\s*)(.*)$/)
        return [segment(indent), jsonValue(rest)]
    })

export const runCommand = (input, data) => {
    const [name = '', ...args] = input.trim().split(/\s+/)
    const command = name.toLowerCase()

    if (!command) return { lines: [] }
    if (command === 'sudo') return { lines: [[segment('Permiso denegado. Buen intento.', 'error')]] }

    switch (command) {
        case 'help':
            return {
                lines: [
                    [segment('Comandos disponibles:')],
                    ...helpRows.map(([cmd, description]) => [segment('  '), segment(pad(cmd, 15), 'key'), segment(description, 'muted')]),
                ],
            }
        case 'whoami':
            return {
                lines: [
                    [segment(data.nombre, 'string')],
                    [segment(`${data.titulo} · ${data.rol}`)],
                    [segment(`${data.ubicacion} · `, 'muted'), segment(data.disponible ? 'disponible' : 'no disponible', data.disponible ? 'bool' : 'muted')],
                ],
            }
        case 'stack':
            return {
                lines: Object.entries(data.stack).map(([category, items]) => [
                    segment(pad(stackLabels[category] ?? category, 16), 'key'),
                    segment(items.join(', ')),
                ]),
            }
        case 'experiencia':
            return {
                lines: data.experiencia.map((job) => [
                    segment(pad(`${job.desde} → ${job.hasta ?? 'actualidad'}`, 24), 'muted'),
                    segment(job.cargo),
                    segment(' @ ', 'muted'),
                    segment(job.empresa, 'string'),
                ]),
            }
        case 'proyectos':
            return {
                lines: [
                    ...data.proyectos.flatMap((project) => [
                        [segment('• '), segment(project.nombre, 'string'), segment(` (${project.periodo})`, 'muted')],
                        [segment('  '), segment(project.stack.join(', '), 'muted')],
                    ]),
                    [segment('→ escribe "ir proyectos" para ver el detalle', 'muted')],
                ],
            }
        case 'contacto': {
            const { email, linkedin, github } = data.contacto
            return {
                lines: [
                    [segment(pad('email', 10), 'key'), link(email, `mailto:${email}`)],
                    [segment(pad('linkedin', 10), 'key'), link(linkedin.replace(/^https:\/\/(www\.)?/, ''), linkedin)],
                    [segment(pad('github', 10), 'key'), link(github.replace(/^https:\/\//, ''), github)],
                ],
            }
        }
        case 'ir': {
            const target = (args[0] ?? '').toLowerCase().replace('#', '')
            if (!sections.includes(target)) {
                return { lines: [[segment('uso: ir <sobre-mi | proyectos | contacto>', 'error')]] }
            }
            return { lines: [[segment(`→ navegando a #${target}`, 'muted')]], action: { type: 'navigate', to: `/#${target}` } }
        }
        case 'cv':
            return { lines: [[segment('→ abriendo /cv', 'muted')]], action: { type: 'navigate', to: '/cv' } }
        case 'curl':
        case 'get':
            return { lines: [], action: { type: 'fetch' } }
        case 'clear':
            return { lines: [], action: { type: 'clear' } }
        default:
            return { lines: [[segment(`comando no encontrado: ${name}. Escribe "help".`, 'error')]] }
    }
}

export const complete = (input) => {
    const value = input.trimStart().toLowerCase()
    if (value.startsWith('ir ')) {
        const matches = sections.filter((section) => section.startsWith(value.slice(3)))
        return matches.length === 1 ? `ir ${matches[0]}` : input
    }
    const matches = commandNames.filter((name) => name.startsWith(value))
    if (matches.length !== 1) return input
    return matches[0] === 'ir' ? 'ir ' : matches[0]
}
