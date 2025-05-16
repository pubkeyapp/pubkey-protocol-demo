import { type Identity, IdentityProvider, type User } from '@prisma/client'

export type MaybeUserWithIdentities = (User & { identities: Identity[] }) | undefined

export interface PubkeyAuthFindUserByProvider {
  provider: IdentityProvider
  providerId: string
}

export interface PubkeyAuthFindUserById {
  userId: string
}

export interface PubkeyAuthFindUserByUsername {
  username: string
}

export interface PubkeyAuthDatabase {
  findUserById: (options: PubkeyAuthFindUserById) => Promise<MaybeUserWithIdentities>
  findUserByProvider: (options: PubkeyAuthFindUserByProvider) => Promise<MaybeUserWithIdentities>
  findUserByUsername: (options: PubkeyAuthFindUserByUsername) => Promise<MaybeUserWithIdentities>
}
