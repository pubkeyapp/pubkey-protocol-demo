import { redirect } from 'react-router'
import { appMeta } from '~/lib/app-meta'
import { logger } from '~/lib/logger'
import { destroySession, getSession } from '~/lib/sessions.server'
import type { Route } from './+types/route-login'

export function meta() {
  return appMeta('Logout')
}

export default function RouteLogout() {
  return <div>Logout</div>
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('cookie'))
  const user = session.get('user')

  if (!user) {
    logger.info({ event: 'auth_logout_error', message: 'User not found' })
    return redirect('/')
  }

  logger.info({ event: 'auth_logout_success', userId: user.id })
  return redirect('/', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  })
}
