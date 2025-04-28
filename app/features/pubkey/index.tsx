import { type FeaturePage } from '../create-feature-routes'
import { LucideGroup, LucideLayoutDashboard, LucideUsers } from 'lucide-react'
import { index, layout, prefix, route } from '@react-router/dev/routes'

export const path = 'pubkey'
export const pages: FeaturePage[] = [
  { route: 'index', label: 'Dashboard', icon: LucideLayoutDashboard },
  { route: 'communities', label: 'Communities', icon: LucideGroup },
  { route: 'profiles', label: 'Profiles', icon: LucideUsers },
]

const root = `./features/${path}`
const feature = `${root}/${path}`

export const pubkeyRoutes = layout(
  `${feature}-layout.tsx`,
  prefix(path, [
    index(`${feature}-feature-index.tsx`),
    route('communities', `${feature}-feature-community-list.tsx`),
    route('communities/create', `${feature}-feature-community-create.tsx`),
    route('communities/:community', `${feature}-feature-community-detail.tsx`),
    route('profiles', `${feature}-feature-profile-list.tsx`),
    route('profiles/create', `${feature}-feature-profile-create.tsx`),
    route('profiles/:profile', `${feature}-feature-profile-detail.tsx`),
  ]),
)
