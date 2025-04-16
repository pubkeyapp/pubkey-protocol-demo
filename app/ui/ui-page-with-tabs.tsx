import { type UiPageProps } from './ui-page'
import { UiPageWithRoutes } from './ui-page-with-routes'
import { type UiTabRoute, UiTabRoutes } from './ui-tab-routes'

export interface UiPageWithTabsProps extends UiPageProps {
  basePath?: string
  tabs: UiTabRoute[]
}

export function UiPageWithTabs({ tabs, basePath, ...pageProps }: UiPageWithTabsProps) {
  return (
    <UiPageWithRoutes
      routes={[
        {
          path: '*',
          element: <UiTabRoutes basePath={basePath} tabs={tabs} variant="outline" />,
        },
      ]}
      {...pageProps}
    />
  )
}
