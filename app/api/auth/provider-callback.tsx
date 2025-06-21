import { redirect } from 'react-router'
import { authenticator } from '~/lib/authenticator.server'
import { logger } from '~/lib/logger'
import { commitSession, getSession } from '~/lib/sessions.server'
import type { Route } from './+types/provider-callback'
import { ensureSupportedProvider } from '~/api/auth/ensure-supported-provider'

export async function loader({ params: { provider }, request }: Route.LoaderArgs) {
  ensureSupportedProvider(provider)
  const user = await authenticator.authenticate(provider, request)
  if (!user) {
    logger.info({ event: 'auth_provider_login_error', message: `Login error for ${provider}` })
    throw new Response('Invalid login data', { status: 400 })
  }

  logger.info({ event: 'auth_provider_login', message: `Login success for ${provider}`, userId: user.id })
  const session = await getSession(request.headers.get('Cookie'))
  session.set('user', user)

  return redirect('/profile', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
