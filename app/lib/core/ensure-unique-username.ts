import { db } from '~/lib/db.server'

function randomDigits(length: number = 6) {
  return Math.floor(Math.random() * Math.pow(10, length))
}

export async function ensureUniqueUsername(username: string) {
  const user = await db.user.findFirst({
    where: { username },
    select: { id: true },
  })

  if (user) {
    return `${username}-${randomDigits()}`
  }
  return username
}
