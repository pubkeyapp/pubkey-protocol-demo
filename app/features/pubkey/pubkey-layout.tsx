import React from 'react'
import { UiFooter } from '~/ui/ui-footer'
import { UiLayout } from '~/ui/ui-layout'
import { createHeaderLinks, createNavbarLinks } from '~/features/create-feature-routes'
import { pages, path } from './index'
import { WalletMultiIcon } from '@pubkeyapp/wallet-adapter-mantine-ui'

export default function PubkeyLayout() {
  const basePath = `/${path}`

  return (
    <UiLayout
      basePath={basePath}
      headerLinks={createHeaderLinks({ basePath, pages })}
      sidebarLinks={createNavbarLinks({ basePath, pages })}
      headerProfile={<WalletMultiIcon />}
      footer={<UiFooter />}
    />
  )
}
