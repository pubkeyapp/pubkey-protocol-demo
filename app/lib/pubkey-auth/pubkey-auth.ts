import type { PubkeyAuthDatabase } from './pubkey-auth-database'

export interface PubkeyAuth {
  database: PubkeyAuthDatabase
}

export function createPubkeyAuth(options: Pick<PubkeyAuth, 'database'>): PubkeyAuth {
  return {
    database: options.database,
  }
}
