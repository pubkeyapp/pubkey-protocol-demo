import { type FeaturePage } from '../create-feature-routes'
import { LucideDatabase, LucideLayoutDashboard, LucideSoup } from 'lucide-react'
import { index, layout, prefix, route } from '@react-router/dev/routes'

export const path = 'pubkey-auth'
export const pages: FeaturePage[] = [
  { route: 'index', label: 'Dashboard', icon: LucideLayoutDashboard },
  { route: 'database', label: 'Database', icon: LucideDatabase },
  { route: 'solana', label: 'Solana', icon: LucideSoup },
]

const root = `./features/${path}`
const feature = `${root}/${path}`

export const pubkeyAuthRoutes = layout(
  `${feature}-layout.tsx`,
  prefix(path, [
    //
    index(`${feature}-feature-index.tsx`),
    route('database', `${feature}-feature-database.tsx`),
    route('solana', `${feature}-feature-solana.tsx`),
  ]),
)
