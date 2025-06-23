import { authUserRegister } from '~/features/auth/data-access/auth-user-register'
import { logger } from '~/lib/logger'
import { commitSessionAndRedirect } from '~/lib/auth/commit-session-and-redirect'

export async function authHandleUserRegisterRequest(request: Request) {
  const formData = await request.formData()
  const user = await authUserRegister({
    username: formData.get('username')?.toString(),
    password: formData.get('password')?.toString(),
  })
  if (!user) {
    console.log(`authRegister: action: register, user not registered`)
    logger.info({ event: 'auth_register_error', message: 'User not registered' })
    throw new Error('Invalid register data')
  }
  logger.info({ event: 'auth_register_success', userId: user.id })
  return commitSessionAndRedirect({ request, user })
}
