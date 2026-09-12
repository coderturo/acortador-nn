import { defineMiddleware } from 'astro:middleware'
import links from './data/links.json'
import { db } from './lib/db'

export const onRequest = defineMiddleware(async (context, next) => {
  const slug = context.url.pathname.slice(1)

  const destino = (links as Record<string, string>)[slug]

  if (destino) {
    const hoy = new Date().toISOString().slice(0, 10)

    try {
      await db.execute({
        sql: `
          INSERT INTO clicks_daily (slug, day, count)
          VALUES (?, ?, 1)
          ON CONFLICT(slug, day) DO UPDATE SET count = count + 1
        `,
        args: [slug, hoy],
      })
    } catch {
      // Si falla el registro del click, igual redirigimos al usuario.
      // No queremos que un problema de analytics le rompa la experiencia.
    }

    return context.redirect(destino, 302)
  }

  return next()
})
