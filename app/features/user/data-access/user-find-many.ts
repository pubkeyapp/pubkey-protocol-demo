import { db, type User } from '~/lib/db.server'

export async function userFindMany(): Promise<User[]> {
  try {
    return db.user.findMany({ orderBy: { updatedAt: 'desc' } })
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch users')
  }
}
