import { getUserFromRequest } from '~/lib/core/get-user-from-request'

export async function ensureUser(request: Request) {
  const user = await getUserFromRequest(request)

  if (!user) {
    throw new Error('User not found')
  }

  return user
}
