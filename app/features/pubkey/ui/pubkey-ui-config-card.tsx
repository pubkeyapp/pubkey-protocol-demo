import { UiCard } from '~/ui/ui-card'
import type { PubKeyConfig } from '@pubkey-protocol/sdk'
import { UiInfoTable } from '~/ui/ui-info-table'

export function PubkeyUiConfigCard({ config }: { config: PubKeyConfig }) {
  return (
    <UiCard title="PubKey Config" description="PubKey Config Object">
      {config ? (
        <UiInfoTable
          items={[
            ['Community Authority', config.communityAuthority?.toString()],
            ['Config Authority', config.configAuthority?.toString()],
            ['Public Key', config.publicKey?.toString()],
          ]}
        />
      ) : (
        'Not Configured!'
      )}
    </UiCard>
  )
}
