import { ensureSocialProvider } from '~/lib/auth/ensure-social-provider'

export function guardSocialProvider(provider: string) {
  try {
    ensureSocialProvider(provider)
  } catch (error) {
    throw new Response(`${error}`, { status: 400 })
  }
}
