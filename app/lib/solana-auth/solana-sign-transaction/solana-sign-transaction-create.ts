import {
  type Address,
  address,
  appendTransactionMessageInstruction,
  assertIsTransactionMessageWithSingleSendingSigner,
  compileTransaction,
  createTransactionMessage,
  getBase58Decoder,
  getTransactionEncoder,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  type SignatureBytes,
  type SignatureDictionary,
  type SolanaClient,
  type Transaction,
  type TransactionModifyingSignerConfig,
  type TransactionPartialSignerConfig,
  type TransactionSendingSignerConfig,
  type TransactionSigner,
} from 'gill'
import type { SolanaAuthMessage, SolanaAuthMessageCreateOptions } from '../solana-auth-message'
import { getAddMemoInstruction } from '../memo'

export async function solanaSignTransactionCreate(
  client: SolanaClient,
  options: SolanaAuthMessageCreateOptions,
): Promise<SolanaAuthMessage> {
  // TODO: Implement.
  const text = `Sign this transaction to prove you own ${options.publicKey}`
  const latestBlockhash = await client.rpc
    .getLatestBlockhash()
    .send()
    .then((response) => response.value)

  const messageSigner = createPartialSigner(address(options.publicKey))
  const message = pipe(
    createTransactionMessage({ version: 0 }),
    (m) => setTransactionMessageFeePayerSigner(messageSigner, m),
    (m) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, m),
    (m) => appendTransactionMessageInstruction(getAddMemoInstruction({ memo: text }), m),
  )

  const transaction = compileTransaction(message)
  const wireTransactionBytes = getTransactionEncoder().encode(transaction)
  const base58Transaction = getBase58Decoder().decode(wireTransactionBytes)

  assertIsTransactionMessageWithSingleSendingSigner(message)

  return {
    publicKey: options.publicKey,
    method: options.method,
    blockhash: latestBlockhash.blockhash,
    nonce: `Nonce ${Date.now()}`,
    message: {
      chain: 'solana:devnet',
      text: base58Transaction,
    },
  }
}

export function createPartialSigner(address: Address): TransactionSigner {
  return {
    modifyAndSignTransactions<T>(
      transactions: readonly T[],
      config: TransactionModifyingSignerConfig | undefined,
    ): Promise<readonly T[]> {
      return Promise.resolve([])
    },
    signAndSendTransactions(
      transactions: readonly Transaction[],
      config: TransactionSendingSignerConfig | undefined,
    ): Promise<readonly SignatureBytes[]> {
      return Promise.resolve([])
    },
    signTransactions(
      transactions: readonly Transaction[],
      config: TransactionPartialSignerConfig | undefined,
    ): Promise<readonly SignatureDictionary[]> {
      return Promise.resolve([])
    },
    address,
  }
}
