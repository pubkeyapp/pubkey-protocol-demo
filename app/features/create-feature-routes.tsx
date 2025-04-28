import { index, layout, prefix, route } from '@react-router/dev/routes'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import type { LucideProps } from 'lucide-react'
import type { UiHeaderLink } from '~/ui/ui-header'
import type { UiLayoutNavbarLinkGroup } from '~/ui/ui-sidebar-links-group'

export interface FeaturePage {
  route: string
  label: string
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
}

export function createFeatureRoutes({ path, routes }: { path: string; routes: string[] }) {
  const root = `./features/${path}`
  const layoutPath = `${root}/layout-${path}.tsx`

  return layout(
    layoutPath,
    prefix(
      path,
      routes.map((item) => indexOrRoute({ item, path, root })),
    ),
  )
}

function indexOrRoute({ item, path, root }: { item: string; path: string; root: string }) {
  const file = `${root}/${path}-feature-${item}.tsx`

  return item === 'index' ? index(file) : route(item, file)
}

export function createHeaderLinks({ basePath, pages }: { basePath: string; pages: FeaturePage[] }): UiHeaderLink[] {
  return [
    ...pages.map((item) => ({
      to: `${basePath}${item.route === 'index' ? '' : `/${item.route}`}`,
      label: item.label,
    })),
  ]
}

export function createNavbarLinks({
  basePath,
  pages,
}: {
  basePath: string
  pages: FeaturePage[]
}): UiLayoutNavbarLinkGroup[] {
  return [
    ...pages.map((item) => ({
      to: `${basePath}${item.route === 'index' ? '' : `/${item.route}`}`,
      label: item.label,
      icon: item.icon,
    })),
  ]
}
