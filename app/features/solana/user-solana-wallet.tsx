import { Button, Flex, Group, Stack, Text } from '@mantine/core'
import { getBase58Decoder } from 'gill'
import type { Route } from './+types/user-solana-wallet'
import { useWallet } from '@solana/wallet-adapter-react'
import type { SolanaAuthMessage, SolanaAuthMessageSigned } from '~/lib/solana-auth/solana-auth-message'
import { getUser } from '~/features/auth/data-access/get-user'
import { useSolanaAuth } from '~/features/solana/use-solana-auth'
import { SolanaSignMessageButton } from '~/features/solana/solana-sign-message-button'
import { handleSolanaVerification } from '~/features/solana/handle-solana-verification'
import { useCallback } from 'react'

export async function loader(args: Route.LoaderArgs) {
  const user = await getUser(args.request)

  return { user }
}

export async function action({ request }: Route.LoaderArgs) {
  const formData = await request.formData()
  const action = formData.get('action')?.toString()
  const payload = formData.get('payload')?.toString()
  const publicKey = formData.get('publicKey')?.toString()

  if (!publicKey) {
    return { success: false, message: `No public key` }
  }

  return await handleSolanaVerification({ action, request, payload, publicKey })
}

export default function UserSolanaWallet({ loaderData: { user } }: Route.ComponentProps) {
  const wallet = useWallet()
  const publicKey = wallet.publicKey?.toString() ?? ''
  const { fetcher, handleCreateSignMessage, handleVerifySignMessage } = useSolanaAuth({
    publicKey,
  })
  const sign = useCallback(
    async (message: SolanaAuthMessage) => {
      if (!wallet.signMessage) {
        return
      }
      const result = await createSignatureWallet({
        message,
        signMessage: wallet.signMessage,
      })
      return await sign(result)
    },
    [wallet.signMessage],
  )

  const walletIdentity = user?.identities.find((i) => i.provider === 'Solana' && i.providerId === publicKey)

  return (
    <Flex direction="column" align="center" justify="center" h="100%">
      <Stack align="center" gap="xl">
        {publicKey.length ? (
          <Stack align="center">
            <Text size="xl">Connected to {walletIdentity ? 'your' : ''} wallet</Text>
            <Text size="xs" ff="monospace">
              {publicKey}
            </Text>
          </Stack>
        ) : null}
        <Group>
          <SolanaSignMessageButton fetcher={fetcher} publicKey={publicKey} onClick={() => handleCreateSignMessage()} />
        </Group>
        {fetcher.data?.type === 'solana-auth-message' ? (
          <div>
            <SignComponent message={fetcher.data.message} sign={(payload) => handleVerifySignMessage(payload)} />
            <pre>{JSON.stringify(fetcher.data.message, null, 2)}</pre>
          </div>
        ) : null}
        <pre>{JSON.stringify({ ...walletIdentity, profile: undefined }, null, 2)}</pre>
      </Stack>
    </Flex>
  )
}

function SignComponent({
  message,
  sign,
}: {
  message: SolanaAuthMessage
  sign: (payload: SolanaAuthMessageSigned) => Promise<void>
}) {
  const { signMessage } = useWallet()

  return (
    <div>
      {signMessage ? (
        <Button
          onClick={async () => {
            const result = await createSignatureWallet({
              message,
              signMessage,
            })
            return await sign(result)
          }}
        >
          Sign
        </Button>
      ) : (
        <div>No wallet</div>
      )}
    </div>
  )
}

export interface CreateSignatureWallet {
  message: SolanaAuthMessage
  signMessage: (message: Uint8Array) => Promise<Uint8Array>
}

export function bs58Encode(data: Uint8Array) {
  return getBase58Decoder().decode(data)
}

export async function createSignatureWallet({
  message,
  signMessage,
}: CreateSignatureWallet): Promise<SolanaAuthMessageSigned> {
  const encoded = encodeMessage(message.message.text)
  const signature = await signMessage(encoded)

  return { ...message, signature: bs58Encode(signature) }
}

export function encodeMessage(message: string): Uint8Array {
  return new TextEncoder().encode(message)
}
