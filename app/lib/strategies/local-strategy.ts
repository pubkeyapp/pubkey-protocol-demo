import { OAuth2Strategy } from 'remix-auth-oauth2'

import { prisma, type User } from '~/lib/db.server'

const authLocalClientId = process.env.AUTH_LOCAL_CLIENT_ID
const authLocalClientSecret = process.env.AUTH_LOCAL_CLIENT_SECRET
const authLocalEndpointAuthorize = process.env.AUTH_LOCAL_ENDPOINT_AUTHORIZE
const authLocalEndpointToken = process.env.AUTH_LOCAL_ENDPOINT_TOKEN
if (!authLocalClientId || !authLocalClientSecret) {
  throw new Error('AUTH_LOCAL_CLIENT_ID or AUTH_LOCAL_CLIENT_SECRET is not set')
}
if (!authLocalEndpointAuthorize || !authLocalEndpointToken) {
  throw new Error('AUTH_LOCAL_ENDPOINT_AUTHORIZE or AUTH_LOCAL_ENDPOINT_TOKEN is not set')
}

const redirectURI = `${process.env.API_URL}/api/auth/local/callback`

export const localStrategy = new OAuth2Strategy<User>(
  {
    clientId: authLocalClientId,
    clientSecret: authLocalClientSecret,
    redirectURI,
    authorizationEndpoint: authLocalEndpointAuthorize,
    tokenEndpoint: authLocalEndpointToken,
  },
  async ({ request, tokens }) => {
    console.log(`request, tokens`, {
      request,
      tokens,
    })
    const found = await prisma.user.findFirst({
      where: { identities: { some: { providerId: tokens.accessToken() } } },
      include: { identities: true },
    })
    if (!found) {
      throw new Error(`User not found :( `)
    }
    return found
  },
)
