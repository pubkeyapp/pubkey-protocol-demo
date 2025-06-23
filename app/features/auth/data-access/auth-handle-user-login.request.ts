import { authenticator } from '~/lib/authenticator.server'
import { logger } from '~/lib/logger'
import { commitSessionAndRedirect } from '~/lib/auth/commit-session-and-redirect'

export async function authHandleUserLoginRequest(request: Request) {
  const user = await authenticator.authenticate('user-pass', request)
  if (!user) {
    logger.info({ event: 'auth_login_error', message: 'User not found' })
    throw new Error('Invalid login data')
  }
  logger.info({ event: 'auth_login_success', userId: user.id })
  return commitSessionAndRedirect({ request, user })
}
