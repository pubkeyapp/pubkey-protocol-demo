import { getSessionFromCookie } from '~/lib/auth/get-session-from-cookie'

export async function getSessionAndUser(request: Request) {
  const session = await getSessionFromCookie(request)

  return { session, user: session.get('user') }
}
