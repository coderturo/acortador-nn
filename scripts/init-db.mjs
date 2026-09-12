import { createClient } from '@libsql/client'

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

await db.execute(`
  CREATE TABLE IF NOT EXISTS clicks_daily (
    slug TEXT NOT NULL,
    day TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (slug, day)
  )
`)

console.log('Tabla clicks_daily creada correctamente')
