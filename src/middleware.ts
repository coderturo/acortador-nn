import { defineMiddleware } from 'astro:middleware'
import links from './data/links.json'

export const onRequest = defineMiddleware((context, next) => {
  const slug = context.url.pathname.slice(1) // quita la "/" inicial

  const destino = (links as Record<string, string>)[slug]

  if (destino) {
    return context.redirect(destino, 302)
  }

  return next()
})