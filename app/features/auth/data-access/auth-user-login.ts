import { z } from 'zod'
import { userFindByUsername } from '~/features/user/data-access/user-find-by-username'
import { authUserPassword } from './auth-user-password'

export const UserAuthLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export async function authUserLogin(input: { username?: string; password?: string }) {
  const { error, data } = UserAuthLoginSchema.safeParse(input)
  if (error) {
    console.error(error)
    throw new Error('Invalid login data')
  }
  const found = await userFindByUsername(data.username)
  if (!found) {
    throw new Error('User not found')
  }
  if (!found.password) {
    throw new Error('User has no password')
  }
  if (!(await authUserPassword.compare(data.password, found.password))) {
    throw new Error('Invalid password')
  }
  return found
}
