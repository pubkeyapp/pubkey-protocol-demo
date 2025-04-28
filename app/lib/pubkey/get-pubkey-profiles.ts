import { getPubkeySdkCommunity } from '~/lib/pubkey/get-pubkey-sdk-community'

export async function getPubkeyProfiles() {
  const sdk = getPubkeySdkCommunity()

  await sdk.profileGetAll()
}
