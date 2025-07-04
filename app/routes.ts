import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes'
import { adminUserRoutes } from './features/user'
import { devRoutes } from './features/dev'
import { onboardingRoutes } from './features/onboarding'
import { profileRoutes } from './features/profile'
import { pubkeyRoutes } from './features/pubkey'
import { userSolanaRoutes } from './features/solana'

export default [
  ...prefix('api', [
    // API routes go here
    route('auth/:provider', 'api/auth/provider.tsx'),
    route('auth/:provider/callback', 'api/auth/provider-callback.tsx'),
    route('set-theme', 'api/set-theme.tsx'),
  ]),
  // Admin routes go here
  layout('features/admin/layout-admin.tsx', [
    ...prefix('admin', [
      ...adminUserRoutes,
      index('features/admin/route-admin-dashboard.tsx'),
      ...prefix('settings', [
        route('general', 'features/admin/route-admin-settings-general.tsx'),
        route('security', 'features/admin/route-admin-settings-security.tsx'),
      ]),
    ]),
  ]),
  devRoutes,
  pubkeyRoutes,
  // App routes go here
  layout('features/app/layout-app.tsx', [
    route('dashboard', 'features/app/route-dashboard.tsx'),
    route('profile', 'features/profile/profile-feature-manage.tsx'),
    userSolanaRoutes,
  ]),
  // Auth routes go here
  layout('features/auth/layout-auth.tsx', [route('logout', 'features/auth/route-logout.tsx')]),
  // Homepage routes go here
  layout('features/homepage/layout-homepage.tsx', [
    index('features/homepage/route-index.tsx'),
    route('login', 'features/auth/route-login.tsx'),
    route('terms', 'features/homepage/route-terms.tsx'),
    route('privacy', 'features/homepage/route-privacy.tsx'),
    route('about', 'features/homepage/route-about.tsx'),
    ...profileRoutes,
    ...onboardingRoutes,
  ]),
] satisfies RouteConfig
