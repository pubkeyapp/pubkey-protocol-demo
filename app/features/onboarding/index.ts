import { index, prefix, route } from '@react-router/dev/routes'

export const onboardingRoutes = prefix('onboarding', [
  index('./features/onboarding/onboarding-socials-feature.tsx'),
  route('/wallets', './features/onboarding/onboarding-wallets-feature.tsx'),
  route('/profile', './features/onboarding/onboarding-profile-feature.tsx'),
  route('/done', './features/onboarding/onboarding-done-feature.tsx'),
])
