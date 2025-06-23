import { Authenticator } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'
import { authUserLogin } from '~/features/auth/data-access/auth-user-login'
import { type User } from '~/lib/db.server'
import { googleStrategy } from './strategies/google-strategy'
import { githubStrategy } from './strategies/github-strategy'
import { xStrategy } from './strategies/x-strategy'

export const authenticator = new Authenticator<User>()

const userPassStrategy = new FormStrategy(async ({ form }) => {
  return await authUserLogin({
    username: form.get('username')?.toString(),
    password: form.get('password')?.toString(),
  })
})

authenticator.use(userPassStrategy, 'user-pass')
authenticator.use(githubStrategy, 'github')
authenticator.use(googleStrategy, 'google')
authenticator.use(xStrategy, 'x')
