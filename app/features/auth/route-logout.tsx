import { appMeta } from '~/lib/app-meta'
import type { Route } from './+types/route-login'
import { destroySessionAndRedirect } from '~/lib/auth/destroy-session-and-redirect'

export function meta() {
  return appMeta('Logout')
}

export default function RouteLogout() {
  return <div>Logout</div>
}

export async function loader({ request }: Route.LoaderArgs) {
  return destroySessionAndRedirect({ request })
}
