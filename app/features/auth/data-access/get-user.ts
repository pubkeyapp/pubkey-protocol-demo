import { getSession } from '~/lib/sessions.server'
import { logger } from '~/lib/logger'
import { userFindById } from '~/lib/core/user-find-by-id'

export async function getUser(request: Request) {
  const session = await getSession(request.headers.get('cookie'))

  const user = session.get('user')
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
