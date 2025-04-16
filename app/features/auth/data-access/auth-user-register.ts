import { z } from 'zod'
import { adminUserCreate } from '~/features/user/data-access/admin-user-create'
import { type User } from '~/lib/db.server'
import { authUserPassword } from './auth-user-password'

export const UserAuthRegisterSchema: z.ZodType<{ username: string; password: string }> = z.object({
  username: z.string(),
  password: z.string(),
})

export async function authUserRegister(input: { username?: string; password?: string }): Promise<User> {
  const { error, data } = UserAuthRegisterSchema.safeParse(input)
  if (error) {
    console.error(error)
    throw new Error('Invalid register data')
  }
  const created = await adminUserCreate({ ...data, password: await authUserPassword.hash(data.password) })
  console.log(`userRegister: user ${created.username} (${created.id}) registered successfully`)
  return created
}
