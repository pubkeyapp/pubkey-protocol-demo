import { Container } from '@mantine/core'
import type { PubKeyConfig } from '@pubkey-protocol/sdk'
import { data, useFetcher } from 'react-router'
import type { Route } from './+types/pubkey-feature-profile-create'
import { appMeta } from '~/lib/app-meta'
import { getPubkeyConfig } from '~/lib/pubkey/get-pubkey-config'
import { ensureFeePayerBalance } from '~/lib/solana/ensure-fee-payer-balance'
import { getSolanaContext } from '~/lib/solana/get-solana-context'
import { UiPage } from '~/ui/ui-page'
import { UiBackButton } from '~/ui/ui-back-button'
import { UiCard } from '~/ui/ui-card'
import { PubkeyUiProfileCreateForm } from './ui/pubkey-ui-profile-create-form'
import { getPubkeySdkCommunity } from '~/lib/pubkey/get-pubkey-sdk-community'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, VersionedTransaction } from '@solana/web3.js'
import { base58 } from '@metaplex-foundation/umi'

export function meta() {
  return appMeta('Profiles')
}

export async function loader() {
  const config: PubKeyConfig | null = await getPubkeyConfig()

  await ensureFeePayerBalance()

  return { config }
}

export async function action({ params, context, request }: Route.ActionArgs) {
  const { connection, feePayerAuthority, feePayerCommunity } = getSolanaContext()
  const formData = await request.formData()
  const name = formData.get('name')
  if (!name || typeof name !== 'string' || !name.length) {
    return data({ errors: { name: 'Unexpected name' } })
  }
  const username = formData.get('username')
  if (!username || typeof username !== 'string' || !username.length) {
    return data({ errors: { username: 'Unexpected name' } })
  }
  const authority = formData.get('authority')
  if (!authority || typeof authority !== 'string' || !authority.length || !isValidSolanaPubKey(authority)) {
    return data({ errors: { username: 'Unexpected authority' } })
  }

  console.log(`Creating profile with name!`, name, '...')
  console.log('formData', formData)
  const sdk = getPubkeySdkCommunity()

  const { input, tx: transaction } = await sdk.profileCreate({
    authority,
    feePayer: feePayerCommunity.publicKey,
    community: feePayerCommunity.publicKey,
    avatarUrl: '',
    name,
    username,
  })
  transaction.sign([feePayerCommunity])

  const tx = txToBase58(transaction)
  // const serialized = transaction.serialize()
  console.log(`serialized tx`, tx)

  return data({ tx, foo: 'bar' })
  // const { input, tx: transaction } = await sdk.profileCreate({
  //   name,
  //   authority: feePayerCommunity.publicKey,
  //   profileAuthority: feePayerAuthority.publicKey,
  // })
  //
  // transaction.sign([feePayerAuthority, feePayerCommunity])
  //
  // const signature = await connection.sendRawTransaction(transaction.serialize(), { skipPreflight: true })
  // console.log(`Initialize signature`, signature)
  // console.log(`Created profile`, input.name, '. Sleeping for 3 seconds...')
  // await sleep(3)
  // return redirect(`/pubkey/communities/${input.slug}`)
}

export default function PubkeyFeatureCommunityCreate({ loaderData: { config } }: Route.ComponentProps) {
  const fetcher = useFetcher()
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()

  // if (fetcher.data?.tx) {
  //   console.log(`You should sign this TX with the local wallet!!`, fetcher.data.tx)
  // }

  return (
    <UiPage title="Create Profile" icon={<UiBackButton />}>
      <Container h="100%" style={{ overflow: 'auto' }}>
        <UiCard>
          <fetcher.Form
            method="post"
            onSubmit={async (x) => {
              if (!sendTransaction) {
                console.log(`Send transaction is not here :(`)
                return
              }
              if (fetcher.data?.tx) {
                console.log(`fetcher data`, fetcher.data)
                const tx = base58ToTx(fetcher.data.tx)
                const signed = await sendTransaction(tx, connection)
                console.log(`Signed`, signed)
              }
            }}
          >
            <PubkeyUiProfileCreateForm authority={publicKey?.toString() ?? ''} loading={fetcher.state !== 'idle'} />
            {fetcher.data?.errors ? <pre>{JSON.stringify(fetcher.data.errors)}</pre> : null}
          </fetcher.Form>
        </UiCard>
      </Container>
    </UiPage>
  )
}

function isValidSolanaPubKey(address: string) {
  try {
    return !!new PublicKey(address)
  } catch {
    return false
  }
}

function txToBase58(tx: VersionedTransaction): string {
  const [res] = base58.deserialize(tx.serialize())
  return res
}

function base58ToTx(serialized: string): VersionedTransaction {
  return VersionedTransaction.deserialize(base58.serialize(serialized))
}
