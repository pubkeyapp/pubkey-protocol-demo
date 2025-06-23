import { Twitter2Strategy as XStrategy } from 'remix-auth-twitter'
import { type User } from '~/lib/db.server'
import { IdentityProvider, Prisma } from '@prisma/client'
import { logger } from '~/lib/logger'
import { getUser } from '~/features/auth/data-access/get-user'
import type { OAuth2Tokens } from 'arctic'

import { userUpdateWithIdentity } from '~/lib/core/user-update-with-identity'
import { identityFindByProviderId } from '~/lib/core/identity-find-by-provider-id'
import { userCreateWithIdentity } from '~/lib/core/user-create-with-identity'
import { TwitterApi, type UserV2 } from 'twitter-api-v2'
import type { IdentityProfile } from '~/lib/strategies/identity-profile'

const authXClientId = process.env.AUTH_X_CLIENT_ID
const authXClientSecret = process.env.AUTH_X_CLIENT_SECRET
if (!authXClientId || !authXClientSecret) {
  throw new Error('AUTH_X_CLIENT_ID or AUTH_X_CLIENT_SECRET is not set')
}

const redirectURI = `${process.env.API_URL}/api/auth/x/callback`

export const xStrategy = new XStrategy<User>(
  {
    callbackURL: redirectURI,
    clientID: authXClientId,
    clientSecret: authXClientSecret,
    scopes: ['offline.access', 'tweet.read', 'users.read'],
  },
  async ({ request, tokens }) => {
    console.log(`xStrategy`, tokens)
    const identityProfile = await getXProfile(tokens.accessToken())
    const profile = convertProfileToUser(identityProfile, tokens)
    const found = await identityFindByProviderId({
      provider: profile.provider,
      providerId: profile.providerId?.toString(),
    })

    if (found) {
      logger.info({ event: 'auth_x_find_identity', message: 'X find identity', userId: profile.providerId })
      return found
    }

    logger.info({ event: 'auth_x_login', message: 'X login', userId: profile.id })

    const existing = await getUser(request)
    if (existing?.id) {
      const updated = await userUpdateWithIdentity(existing.id, profile)
      logger.info({
        event: 'auth_x_login',
        message: `X identity added to user ${existing.username}`,
        userId: profile.id,
      })
      return updated
    }

    const created = await userCreateWithIdentity(profile)
    logger.info({ event: 'auth_x_login', message: 'X identity used to create user', userId: created.id })
    return created
  },
)

function convertProfileToUser(input: UserV2, tokens: OAuth2Tokens): Prisma.IdentityCreateWithoutOwnerInput {
  const name = input.name
  const address = input.username
  const profile: IdentityProfile = {
    bio: input.description,
    username: input.username,
    avatarUrl: input.profile_image_url,
    raw: input,
  }

  return {
    accessToken: tokens.accessToken(),
    refreshToken: tokens.hasRefreshToken() ? tokens.refreshToken() : undefined,
    name,
    address,
    provider: IdentityProvider.X,
    providerId: input.id.toString(),
    profile: profile as Prisma.InputJsonValue,
    verified: true,
  }
}

async function getXProfile(token: string) {
  console.log(`getXProfile`, token)
  const client = new TwitterApi(token)
  console.log(`getXProfile`, client)
  let response = await client.v2.me({
    'user.fields': ['description', 'name', 'profile_image_url', 'username'],
  })

  return response.data
}
