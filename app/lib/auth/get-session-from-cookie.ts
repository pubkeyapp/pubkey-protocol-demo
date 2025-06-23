import { getSession } from '~/lib/sessions.server'

export async function getSessionFromCookie(request: Request) {
  return await getSession(request.headers.get('Cookie'))
}
