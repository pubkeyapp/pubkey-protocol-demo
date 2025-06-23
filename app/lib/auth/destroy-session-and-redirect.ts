import { getSessionFromCookie } from '~/lib/auth/get-session-from-cookie'
import { redirect } from 'react-router'
import { destroySession } from '~/lib/sessions.server'

export interface DestroySessionAndRedirectOptions {
  request: Request
  to?: string
}

export async function destroySessionAndRedirect({ request, to = '/' }: DestroySessionAndRedirectOptions) {
  const session = await getSessionFromCookie(request)

  return redirect(to, {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  })
}
