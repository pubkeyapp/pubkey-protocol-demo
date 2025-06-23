import { authenticator } from '~/lib/authenticator.server'
import { logger } from '~/lib/logger'
import type { Route } from './+types/provider-callback'
import { guardSocialProvider } from '~/lib/auth/guard-social-provider'
import { commitSessionAndRedirect } from '~/lib/auth/commit-session-and-redirect'

export async function loader({ params: { provider }, request }: Route.LoaderArgs) {
  guardSocialProvider(provider)
  const user = await authenticator.authenticate(provider, request)
  if (!user) {
    logger.info({ event: 'auth_provider_login_error', message: `Login error for ${provider}` })
    throw new Response('Invalid login data', { status: 400 })
  }

  logger.info({ event: 'auth_provider_login', message: `Login success for ${provider}`, userId: user.id })
  return commitSessionAndRedirect({ request, user })
}
