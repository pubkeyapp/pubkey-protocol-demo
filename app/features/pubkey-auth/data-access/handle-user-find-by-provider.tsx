import type { PubkeyAuthFindUserByProvider } from '~/lib/pubkey-auth/pubkey-auth-database'
import { pubkeyAuth } from '~/lib/pubkey-auth'

export async function handleUserFindByProvider(data: FormData) {
  const payload = data.get('payload')?.toString() ?? ''
  const parsed: PubkeyAuthFindUserByProvider = JSON.parse(payload)
  const found = await pubkeyAuth.database.findUserByProvider(parsed)

  return found ?? null
}
