import { authenticator } from '~/lib/authenticator.server'
import type { Route } from './+types/provider'
import { ensureSupportedProvider } from '~/api/auth/ensure-supported-provider'

export const loader = async ({ params: { provider }, request }: Route.LoaderArgs) => {
  ensureSupportedProvider(provider)
  return await authenticator.authenticate(provider, request)
}
