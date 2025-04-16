import { db, type User } from '~/lib/db.server'
import { userFindById } from './user-find-by-id'

export async function adminUserDelete(id: string): Promise<User> {
  const found = await userFindById(id)
  try {
    return db.user.delete({ where: { id: found.id } })
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete user')
  }
}
