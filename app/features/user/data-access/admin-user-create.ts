import { userFindByUsername } from '~/features/user/data-access/user-find-by-username'
import { prisma, type User, type UserCreateInput, UserCreateInputSchema } from '~/lib/db.server'

export async function adminUserCreate(input: UserCreateInput): Promise<User> {
  const { error, data } = UserCreateInputSchema.safeParse(input)
  if (error) {
    console.error(error)
    throw new Error('Invalid user data')
  }
  const found = await userFindByUsername(data.username, false)
  if (found) {
    throw new Error('User already exists')
  }
  try {
    const created = await prisma.user.create({ data })
    console.log(`userCreate: created user ${created.username} (${created.id})`)
    return created
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create user')
  }
}
