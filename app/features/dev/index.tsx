import { createFeatureRoutes, type FeaturePage } from '../create-feature-routes'
import { LucideLayoutDashboard, LucidePuzzle, LucideSparkle } from 'lucide-react'

export const devBasePath = 'dev'

export const devPages: FeaturePage[] = [
  { route: 'index', label: 'Dashboard', icon: LucideLayoutDashboard },
  { route: 'components', label: 'Components', icon: LucidePuzzle },
  { route: 'new', label: 'New', icon: LucideSparkle },
]

export const devRoutes = createFeatureRoutes({
  path: devBasePath,
  routes: devPages.map((page) => page.route),
})
