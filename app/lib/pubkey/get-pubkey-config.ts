import type { PubKeyConfig } from '@pubkey-protocol/sdk'

import { getPubkeySdkAuthority } from '~/lib/pubkey/get-pubkey-sdk-authority'

export async function getPubkeyConfig(): Promise<PubKeyConfig | null> {
  const sdk = getPubkeySdkAuthority()
  const config: PubKeyConfig | null = await sdk.configGetNullable()

  if (!config || !config.communityAuthority) {
    return null
  }

  return {
    ...config,
    communityAuthority: config?.communityAuthority?.toString(),
    configAuthority: config?.configAuthority?.toString(),
    publicKey: config?.publicKey?.toString(),
  }
}
