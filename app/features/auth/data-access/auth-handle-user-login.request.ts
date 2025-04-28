import { redirect } from 'react-router'
import { authenticator } from '~/lib/authenticator.server'
import { logger } from '~/lib/logger'
import { commitSession, getSession } from '~/lib/sessions.server'
import { ph } from '~/lib/get-post-hog.server'

export async function authHandleUserLoginRequest(request: Request) {
  const user = await authenticator.authenticate('user-pass', request)
  if (!user) {
    logger.info({ event: 'auth_login_error', message: 'User not found' })
    ph.capture({ distinctId: 'anonymous', event: 'login-error', properties: { path: '/' } })
    await ph.shutdown()
    throw new Error('Invalid login data')
  }
  const session = await getSession(request.headers.get('Cookie'))
  session.set('user', user)
  ph.capture({ distinctId: user.id, event: 'login', properties: { path: '/' } })
  ph.alias({ distinctId: user.id, alias: user.username })
  ph.identify({ distinctId: user.id, properties: { username: user.username } })
  await ph.shutdown()

  logger.info({ event: 'auth_login_success', userId: user.id })
  return redirect('/profile', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
