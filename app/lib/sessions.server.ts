import { createCookieSessionStorage } from 'react-router'
import { createThemeSessionResolver } from 'remix-themes'

const appId = process.env.APP_ID ?? 'samui-stack'
const domain = process.env.DOMAIN ?? 'localhost'
const secret = process.env.COOKIE_SECRET ?? ''
const secure = process.env.NODE_ENV === 'production'

const sessionStorage = createCookieSessionStorage({
  cookie: {
    domain,
    httpOnly: true,
    name: `__${appId}-theme`,
    path: '/',
    secrets: [secret],
    secure,
  },
})

export const themeSessionResolver = createThemeSessionResolver(sessionStorage)

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    domain,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 15,
    name: `__${appId}-auth`,
    path: '/',
    sameSite: 'lax',
    secrets: [secret],
    secure, // 15 days
  },
})

export { getSession, commitSession, destroySession }
