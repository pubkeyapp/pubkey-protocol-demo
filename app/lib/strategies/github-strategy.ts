import { GitHubStrategy } from 'remix-auth-github'
import { type User } from '~/lib/db.server'
import { IdentityProvider, Prisma } from '@prisma/client'
import { logger } from '~/lib/logger'
import { getUser } from '~/features/auth/data-access/get-user'
import type { OAuth2Tokens } from 'arctic'
import { userUpdateWithIdentity } from '~/lib/core/user-update-with-identity'
import { identityFindByProviderId } from '~/lib/core/identity-find-by-provider-id'
import { userCreateWithIdentity } from '~/lib/core/user-create-with-identity'
import type { IdentityProfile } from './identity-profile'

const authGithubClientId = process.env.AUTH_GITHUB_CLIENT_ID
const authGithubClientSecret = process.env.AUTH_GITHUB_CLIENT_SECRET
if (!authGithubClientId || !authGithubClientSecret) {
  throw new Error('AUTH_GITHUB_CLIENT_ID or AUTH_GITHUB_CLIENT_SECRET is not set')
}

const redirectURI = `${process.env.API_URL}/api/auth/github/callback`

export const githubStrategy = new GitHubStrategy<User>(
  { clientId: authGithubClientId, clientSecret: authGithubClientSecret, redirectURI },
  async ({ request, tokens }) => {
    const identityProfile = await getGitHubProfile(tokens.accessToken())
    const profile = convertProfileToUser(identityProfile, tokens)
    const found = await identityFindByProviderId({
      provider: profile.provider,
      providerId: profile.providerId?.toString(),
    })

    if (found) {
      logger.info({ event: 'auth_github_find_identity', message: 'GitHub find identity', userId: profile.providerId })
      return found
    }

    logger.info({ event: 'auth_github_login', message: 'GitHub login', userId: profile.id })

    const existing = await getUser(request)
    if (existing?.id) {
      const updated = await userUpdateWithIdentity(existing.id, profile)
      logger.info({
        event: 'auth_github_login',
        message: `GitHub identity added to user ${existing.username}`,
        userId: profile.id,
      })
      return updated
    }

    const created = await userCreateWithIdentity(profile)
    logger.info({ event: 'auth_github_login', message: 'GitHub identity used to create user', userId: created.id })
    return created
  },
)

interface GitHubProfile {
  id: 36491
  bio: string
  name: string
  login: string
  avatar_url: string
}

function convertProfileToUser(input: GitHubProfile, tokens: OAuth2Tokens): Prisma.IdentityCreateWithoutOwnerInput {
  const name = input.name
  const address = input.login
  const profile: IdentityProfile = {
    bio: input.bio,
    username: input.login,
    avatarUrl: input.avatar_url,
    raw: input,
  }

  return {
    accessToken: tokens.accessToken(),
    refreshToken: tokens.hasRefreshToken() ? tokens.refreshToken() : undefined,
    name,
    address,
    provider: IdentityProvider.Github,
    providerId: input.id.toString(),
    profile: profile as Prisma.InputJsonValue,
    verified: true,
  }
}

async function getGitHubProfile(token: string) {
  let response = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  return await response.json()
}
