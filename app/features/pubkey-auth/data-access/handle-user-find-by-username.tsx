import type { PubkeyAuthFindUserByUsername } from '~/lib/pubkey-auth/pubkey-auth-database'
import { pubkeyAuth } from '~/lib/pubkey-auth'

export async function handleUserFindByUsername(data: FormData) {
  const payload = data.get('payload')?.toString() ?? ''
  const parsed: PubkeyAuthFindUserByUsername = JSON.parse(payload)
  const found = await pubkeyAuth.database.findUserByUsername(parsed)

  return found ?? null
}
