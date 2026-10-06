import { apiProfile } from '../src/data/profile.js'

const body = JSON.stringify(apiProfile, null, 2)

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

    if (req.method === 'OPTIONS') {
        res.statusCode = 204
        res.end()
        return
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8')

    if (req.method !== 'GET') {
        res.statusCode = 405
        res.setHeader('Allow', 'GET, OPTIONS')
        res.end(JSON.stringify({ error: 'Método no permitido. Usa GET.' }, null, 2))
        return
    }

    res.statusCode = 200
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')
    res.end(body)
}
