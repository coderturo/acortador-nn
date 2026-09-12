import type { APIRoute } from 'astro'
import { db } from '../../lib/db'

export const prerender = false

export const GET: APIRoute = async () => {
  const result = await db.execute(`
    SELECT slug, day, count
    FROM clicks_daily
    WHERE day >= date('now', '-6 days')
    ORDER BY slug, day
  `)

  return new Response(JSON.stringify(result.rows), {
    headers: { 'Content-Type': 'application/json' },
  })
}