export function ensureSupportedProvider(provider: string) {
  if (!['google', 'local'].includes(provider)) {
    throw new Response(`Unsupported provider: ${provider}`, { status: 400 })
  }
  return true
}
