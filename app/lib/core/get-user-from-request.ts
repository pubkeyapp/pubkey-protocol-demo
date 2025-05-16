import { getSession } from '~/lib/sessions.server'
import { userFindById } from '~/lib/core/user-find-by-id'

export async function getUserFromRequest(request: Request) {
  const session = await getSession(request.headers.get('cookie'))

  const user = session.get('user')
  if (!user) {
    return
  }
  const found = await userFindById(user.id)
  if (!found) {
    return
  }
  return found
}
