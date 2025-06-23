import type { User } from '@prisma/client'
import type { Identity } from '~/lib/generated/zod'

export function computeUserAvatarUrl(user: Pick<User, 'avatarUrl' | 'username'>) {
  return user.avatarUrl ? user.avatarUrl : defaultUserAvatarUrl(user)
}

export function computeUserViewUrl(user: Pick<User, 'avatarUrl' | 'username'>) {
  return `/u/${user.username}`
}

export function defaultUserAvatarUrl(user: Pick<User, 'username'>) {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${user.username}&backgroundType=gradientLinear`
}

export function defaultIdentityAvatarUrl(identity: Pick<Identity, 'name' | 'providerId'>) {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${identity.name ?? identity.providerId}&backgroundType=gradientLinear`
}
