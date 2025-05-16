import type { PubkeyAuthFindUserById } from '~/lib/pubkey-auth/pubkey-auth-database'
import { pubkeyAuth } from '~/lib/pubkey-auth'

export async function handleUserFindById(data: FormData) {
  const payload = data.get('payload')?.toString() ?? ''
  const parsed: PubkeyAuthFindUserById = JSON.parse(payload)
  const found = await pubkeyAuth.database.findUserById(parsed)

  return found ?? null
}
