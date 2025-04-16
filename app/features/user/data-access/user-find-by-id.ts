import { db, type User } from '~/lib/db.server'

export async function userFindById(id: string): Promise<User> {
  const found = await db.user.findUnique({ where: { id } })
  if (!found) {
    throw new Error('User not found')
  }
  return found
}
