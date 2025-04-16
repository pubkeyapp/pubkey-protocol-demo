import { redirect } from 'react-router'
import { authUserRegister } from '~/features/auth/data-access/auth-user-register'
import { commitSession, getSession } from '~/lib/sessions.server'
import { ph } from "~/lib/get-post-hog.server";
import { logger } from "~/lib/logger";

export async function authHandleUserRegisterRequest(request: Request) {
  const formData = await request.formData()
  const user = await authUserRegister({
    username: formData.get('username')?.toString(),
    password: formData.get('password')?.toString(),
  })
  if (!user) {
    console.log(`authRegister: action: register, user not registered`)
    logger.info({ event: 'auth_register_error', message: 'User not registered' })
    ph.capture({
      distinctId: 'anonymous',
      event: 'register-error',
      properties: { path: '/', username: formData.get('username')?.toString() }
    })
    await ph.shutdown()
    throw new Error('Invalid register data')
  }
  const session = await getSession(request.headers.get('Cookie'))
  session.set('user', user)
  ph.capture({ distinctId: user.id, event: 'register-success', properties: { path: '/' } })
  ph.alias({ distinctId: user.id, alias: user.username })
  ph.identify({ distinctId: user.id, properties: { username: user.username } })
  await ph.shutdown()

  logger.info({ event: 'auth_register_success', userId: user.id })
  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
