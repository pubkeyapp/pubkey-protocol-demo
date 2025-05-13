import { Button, Flex, Group, Stack, Text } from '@mantine/core'
import { useFetcher } from 'react-router'
import { getBase58Decoder, getBase58Encoder, type ReadonlyUint8Array } from 'gill'
import type { Route } from './+types/user-solana-wallet'
import { useWallet } from '@solana/wallet-adapter-react'
import { solanaAuth } from '~/lib/solana-auth/solana-auth'
import type { SolanaAuthMessage, SolanaAuthMessageSigned } from '~/lib/solana-auth/solana-auth-message'
import { getUserBySolanaIdentity } from '~/features/auth/data-access/get-user-by-solana-identity'
import { getUser } from '~/features/auth/data-access/get-user'
import { getSolanaVerificationType, SolanaVerificationType } from './get-solana-verification-type'

function parsePayload(payload: string = ''): SolanaAuthMessageSigned {
  try {
    return JSON.parse(payload)
  } catch {
    throw new Error(`Invalid payload`)
  }
}

export async function action({ request }: Route.LoaderArgs) {
  const formData = await request.formData()
  const action = formData.get('action')?.toString()
  const payload = formData.get('payload')?.toString()
  const publicKey = formData.get('publicKey')?.toString()

  if (!publicKey) {
    return { success: false, message: `No public key` }
  }
  const actor = await getUser(request)
  const owner = await getUserBySolanaIdentity({ providerId: publicKey })

  // This determines the type of verification we are performing
  const verification = getSolanaVerificationType({
    actorId: actor?.id ?? undefined,
    ownerId: owner?.id ?? undefined,
    enabledTypes: [
      SolanaVerificationType.Login,
      SolanaVerificationType.Link,
      SolanaVerificationType.Register,
      SolanaVerificationType.Verify,
    ],
  })
  if (verification.type === SolanaVerificationType.Error) {
    return { success: false, message: verification.message }
  }

  console.log(
    `user-solana-wallet [${action}] -> publicKey: ${publicKey} -> owner: ${owner ? owner.username : 'NONE'} -> type: ${verification.type}`,
  )

  switch (formData.get('action')) {
    case 'sign-message-create':
      return {
        success: true,
        message: await solanaAuth.createMessage({ method: 'solana:signMessage', publicKey }),
        type: 'solana-auth-message',
      }
    case 'sign-message-verify':
      const parsed = parsePayload(payload)
      const result = await solanaAuth.verifyMessage(parsed)
      if (!result) {
        throw new Error('Invalid signature')
      }
      console.log(`sign message -> verify`, 'message', parsed, 'signature', parsed.signature, 'result', result)
      if (verification.type === SolanaVerificationType.Link) {
        // We should link the wallet to the actor.
      }
      if (verification.type === SolanaVerificationType.Login) {
        // We should set the cookie.
      }
      if (verification.type === SolanaVerificationType.Verify) {
        // We don't need to do anything? 🤷‍♂️
      }
      if (verification.type === SolanaVerificationType.Register) {
        // We should register a new user.
      }
      return {
        success: true,
        message: result,
        type: 'solana-auth-result',
      }
    case 'sign-transaction-create':
      return {
        success: true,
        message: await solanaAuth.createMessage({ method: 'solana:signTransaction', publicKey }),
        type: 'solana-auth-message',
      }
    default:
      return {
        success: false,
        message: `Unknown action ${action}`,
      }
  }
}

export default function UserSolanaWallet() {
  const wallet = useWallet()
  const publicKey = wallet.publicKey?.toString() ?? ''
  const fetcher = useFetcher()

  async function handleSubmit(data: Record<string, string>) {
    return await fetcher.submit(data, { method: 'post' })
  }

  async function handleCreate(action: 'sign-message-create' | 'sign-transaction-create') {
    if (!publicKey.length) {
      console.warn(`No public key, please connect your wallet`)
      return
    }
    await handleSubmit({ action, publicKey })
  }

  async function handleVerify(
    action: 'sign-message-verify' | 'sign-transaction-verify',
    payload: SolanaAuthMessageSigned,
  ) {
    if (!publicKey.length) {
      console.warn(`No public key, please connect your wallet`)
      return
    }
    await handleSubmit({ action, publicKey, payload: JSON.stringify(payload) })
  }

  return (
    <Flex direction="column" align="center" justify="center" h="100%" style={{ border: '2px dotted hotpink' }}>
      <Stack align="center" gap="xl">
        {publicKey.length ? (
          <Stack align="center">
            <Text size="xl">Connected to</Text>
            <Text size="xs" ff="monospace">
              {publicKey}
            </Text>
          </Stack>
        ) : null}
        <Group>
          <Button
            disabled={!publicKey}
            loading={fetcher.state === 'submitting'}
            onClick={() => handleCreate('sign-message-create')}
          >
            Verify by signing a message
          </Button>
          <Button
            disabled={!publicKey}
            loading={fetcher.state === 'submitting'}
            onClick={() => handleCreate('sign-transaction-create')}
          >
            Verify by signing a transaction
          </Button>
        </Group>
        {fetcher.data?.type === 'solana-auth-message' ? (
          <div>
            <SignComponent
              message={fetcher.data.message}
              sign={(payload) => handleVerify('sign-message-verify', payload)}
            />
            <pre>{JSON.stringify(fetcher.data.message, null, 2)}</pre>
          </div>
        ) : null}
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

export function bs58Decode(data: string): ReadonlyUint8Array {
  return getBase58Encoder().encode(data)
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
