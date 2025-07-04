import { Flex } from '@mantine/core'
import { data, Form, redirect } from 'react-router'
import { appMeta } from '~/lib/app-meta'
import { logger } from '~/lib/logger'
import type { Route } from './+types/route-login'
import { authHandleUserLoginRequest } from './data-access/auth-handle-user-login.request'
import { getUser } from './data-access/get-user'
import { AuthUiForm } from './ui/auth-ui-form'

export function meta() {
  return appMeta('Login')
}

export async function action({ request }: Route.ActionArgs) {
  return await authHandleUserLoginRequest(request)
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request)
  if (user) {
    logger.info({ event: 'auth_login_redirect', userId: user.id, message: 'User already logged in' })
    return redirect('/profile')
  }
  return data(null)
}

export default function RouteLogin() {
  return (
    <Flex direction="column" justify="center" align="center" h="100%">
      <Form method="post">
        <AuthUiForm title="Sign in to PubKey" />
      </Form>
    </Flex>
  )
}
