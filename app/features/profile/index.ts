import { prefix, route } from '@react-router/dev/routes'

export const profileRoutes = prefix('u', [route('/:username/*', './features/profile/profile-feature-detail.tsx')])
