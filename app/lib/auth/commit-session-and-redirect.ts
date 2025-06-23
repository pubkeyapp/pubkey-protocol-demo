import { redirect } from 'react-router'
import { commitSession } from '~/lib/sessions.server'
import type { User } from '~/lib/db.server'
import { getSessionFromCookie } from '~/lib/auth/get-session-from-cookie'

interface CommitSessionAndRedirectOptions {
  request: Request
  to?: string
  user: User
}

export async function commitSessionAndRedirect({ request, to = '/dashboard', user }: CommitSessionAndRedirectOptions) {
  const session = await getSessionFromCookie(request)

  session.set('user', user)

  return redirect(to, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
