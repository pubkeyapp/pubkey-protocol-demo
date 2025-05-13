import { index, layout, prefix } from '@react-router/dev/routes'

export const userSolanaRoutes = layout('./features/solana/user-solana-layout.tsx',
  prefix('solana', [
    index('./features/solana/user-solana-wallet.tsx'),
  ])
)

