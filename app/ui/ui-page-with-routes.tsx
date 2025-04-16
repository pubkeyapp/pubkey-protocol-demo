import { type RouteObject, useRoutes } from 'react-router'
import { UiPage, type UiPageProps } from './ui-page'

export interface UiPageWithRoutesProps extends UiPageProps {
  path?: string
  routes: RouteObject[]
}

export function UiPageWithRoutes({
  path = '*',
  routes: children = [],
  ...pageProps
}: Omit<UiPageWithRoutesProps, 'children'>) {
  return useRoutes([{ path, element: <UiPage {...pageProps} />, children }])
}
