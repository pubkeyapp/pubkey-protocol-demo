import React from 'react'
import { UiFooter } from '~/ui/ui-footer'
import { UiLayout } from '~/ui/ui-layout'
import { createHeaderLinks, createNavbarLinks } from '~/features/create-feature-routes'
import { devBasePath, devPages } from './index'

export default function LayoutDev() {
  const basePath = `/${devBasePath}`
  const pages = devPages
  return (
    <UiLayout
      basePath={basePath}
      headerLinks={createHeaderLinks({ basePath, pages })}
      sidebarLinks={createNavbarLinks({ basePath, pages })}
      footer={<UiFooter />}
    />
  )
}
