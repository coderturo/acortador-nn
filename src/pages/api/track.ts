import type { APIRoute } from 'astro'
import { db } from '../../lib/db'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const { slug } = await request.json()

  if (!slug) {
    return new Response(null, { status: 400 })
  }

  const today = new Date().toISOString().slice(0, 10) // "2026-09-11"

  await db.execute({
    sql: `
      INSERT INTO clicks_daily (slug, day, count)
      VALUES (?, ?, 1)
      ON CONFLICT(slug, day) DO UPDATE SET count = count + 1
    `,
    args: [slug, today],
  })

  return new Response(null, { status: 204 })
}