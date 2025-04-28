import { getPubkeySdk } from '~/lib/pubkey/get-pubkey-sdk'

export function getPubkeySdkAuthority() {
  return getPubkeySdk({ feePayer: 'authority' })
}