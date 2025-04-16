import type { User } from '@prisma/client'

export function computeUserAvatarUrl(user: Pick<User, 'avatarUrl' | 'username'>) {
  return user.avatarUrl ? user.avatarUrl : defaultUserAvatarUrl(user)
}

export function defaultUserAvatarUrl(user: Pick<User, 'username'>) {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${user.username}&backgroundType=gradientLinear`
}
