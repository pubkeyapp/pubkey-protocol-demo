import { authenticator } from '~/lib/authenticator.server'
import type { Route } from './+types/provider'

export const loader = async ({ params: { provider }, request }: Route.LoaderArgs) => {
  if (provider !== 'google' && provider !== 'github') {
    throw new Response(`Unsupported provider: ${provider}`, { status: 400 })
  }
  return await authenticator.authenticate(provider, request)
}
