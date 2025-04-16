import { db, type User, type UserUpdateInput, UserUpdateInputSchema } from '~/lib/db.server'

export async function adminUserUpdate(id: string, input: UserUpdateInput): Promise<User> {
  const { error, data } = UserUpdateInputSchema.safeParse(input)
  if (error) {
    console.error(error)
    throw new Error('Invalid user data')
  }
  try {
    return db.user.update({ where: { id }, data })
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update user')
  }
}
