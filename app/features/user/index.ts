import { index, prefix, route } from '@react-router/dev/routes'

export const adminUserRoutes = prefix('users', [
  index('./features/user/admin-user-list.tsx'),
  route('/create', './features/user/admin-user-create.tsx'),
  route('/:id/*', './features/user/admin-user-detail.tsx'),
])
