export function ensureSocialProvider(provider: string) {
  if (!socialProviders.includes(provider)) {
    throw new Error(`Unknown provider "${provider}"`)
  }
}

export const socialProviders = ['github', 'google']
