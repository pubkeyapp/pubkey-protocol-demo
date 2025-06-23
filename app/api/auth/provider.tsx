import { authenticator } from '~/lib/authenticator.server'
import type { Route } from './+types/provider'

import { guardSocialProvider } from '~/lib/auth/guard-social-provider'

export const loader = async ({ params: { provider }, request }: Route.LoaderArgs) => {
  guardSocialProvider(provider)
  return await authenticator.authenticate(provider, request)
}
