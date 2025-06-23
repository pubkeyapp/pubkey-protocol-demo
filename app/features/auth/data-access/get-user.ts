import { logger } from '~/lib/logger'
import { userFindById } from '~/lib/core/user-find-by-id'

import { getSessionAndUser } from '~/lib/auth/get-session-and-user'

export async function getUser(request: Request) {
  const { user } = await getSessionAndUser(request)
  if (!user) {
    return
  }
  const found = await userFindById(user.id)
  if (!found) {
    logger.info({ event: 'auth_get_user', message: 'User not found in database' })
    return
  }
  return found
}
