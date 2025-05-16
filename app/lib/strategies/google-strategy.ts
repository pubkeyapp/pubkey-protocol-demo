import { type GoogleProfile, GoogleStrategy } from '@coji/remix-auth-google'
import { type User } from '~/lib/db.server'
import { IdentityProvider, Prisma } from '@prisma/client'
import { logger } from '~/lib/logger'
import type { OAuth2Tokens } from 'arctic'
import { userUpdateWithIdentity } from '~/lib/core/user-update-with-identity'
import { identityFindByProviderId } from '~/lib/core/identity-find-by-provider-id'
import { userCreateWithIdentity } from '~/lib/core/user-create-with-identity'
import { getUserFromRequest } from '~/lib/core/get-user-from-request'

const authGoogleClientId = process.env.AUTH_GOOGLE_CLIENT_ID
const authGoogleClientSecret = process.env.AUTH_GOOGLE_CLIENT_SECRET
if (!authGoogleClientId || !authGoogleClientSecret) {
  throw new Error('AUTH_GOOGLE_CLIENT_ID or AUTH_GOOGLE_CLIENT_SECRET is not set')
}

const redirectURI = `${process.env.API_URL}/api/auth/google/callback`

export const googleStrategy = new GoogleStrategy<User>(
  { clientId: authGoogleClientId, clientSecret: authGoogleClientSecret, redirectURI, prompt: 'select_account' },
  async ({ request, tokens }) => {
    const identityProfile = await GoogleStrategy.userProfile(tokens)
    const profile = convertProfileToUser(identityProfile, tokens)
    const found = await identityFindByProviderId({ provider: profile.provider, providerId: profile.providerId })

    if (found) {
      logger.info({ event: 'auth_google_find_identity', message: 'Google find identity', userId: profile.providerId })
      return found
    }

    logger.info({ event: 'auth_google_login', message: 'Google login', userId: profile.id })

    const existing = await getUserFromRequest(request)
    if (existing) {
      const updated = await userUpdateWithIdentity(existing.id, profile)
      logger.info({
        event: 'auth_google_login',
        message: `Google identity added to user ${existing.username}`,
        userId: profile.id,
      })
      return updated
    }

    const created = await userCreateWithIdentity(profile)
    logger.info({ event: 'auth_google_login', message: 'Google identity used to create user', userId: created.id })
    return created
  },
)

function convertProfileToUser(input: GoogleProfile, tokens: OAuth2Tokens): Prisma.IdentityCreateWithoutOwnerInput {
  const username = input.displayName.replace(' ', '')
  const name = input.displayName
  const email = input.emails[0].value
  const avatarUrl = input.photos[0].value
  const profile: IdentityProfile = { username, avatarUrl, raw: input }

  return {
    accessToken: tokens.accessToken(),
    refreshToken: tokens.hasRefreshToken() ? tokens.refreshToken() : undefined,
    name,
    address: email,
    provider: IdentityProvider.Google,
    providerId: input.id,
    profile: profile as Prisma.InputJsonValue,
    verified: true,
  }
}

export interface IdentityProfile {
  username?: string
  avatarUrl?: string
  raw?: unknown
}
