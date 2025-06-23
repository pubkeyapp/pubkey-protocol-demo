import { useFetcher } from 'react-router'
import type { SolanaAuthMessageSigned } from '~/lib/solana-auth/solana-auth-message'

export function useSolanaAuth({ publicKey }: { publicKey: string }) {
  const fetcher = useFetcher()

  async function handleSubmit(data: Record<string, string>) {
    return await fetcher.submit(data, { method: 'post' })
  }

  async function handleCreate(action: 'sign-message-create') {
    if (!publicKey.length) {
      console.warn(`No public key, please connect your wallet`)
      return
    }
    await handleSubmit({ action, publicKey })
  }

  async function handleVerify(action: 'sign-message-verify', payload: SolanaAuthMessageSigned) {
    if (!publicKey.length) {
      console.warn(`No public key, please connect your wallet`)
      return
    }
    await handleSubmit({ action, publicKey, payload: JSON.stringify(payload) })
  }

  return {
    fetcher,
    handleCreate,
    handleCreateSignMessage: () => handleCreate('sign-message-create'),
    handleVerify,
    handleVerifySignMessage: (payload: SolanaAuthMessageSigned) => handleVerify('sign-message-verify', payload),
  }
}
