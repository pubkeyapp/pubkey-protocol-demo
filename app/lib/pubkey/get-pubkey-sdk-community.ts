import { getPubkeySdk } from '~/lib/pubkey/get-pubkey-sdk'

export function getPubkeySdkCommunity() {
  return getPubkeySdk({ feePayer: 'community' })
}