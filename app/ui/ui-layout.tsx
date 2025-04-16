import { AppShell, Loader } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { type ReactNode, Suspense } from 'react'
import { Outlet } from 'react-router'
import { UiHeader, type UiHeaderLink } from '~/ui/ui-header'
import { UiSidebar } from '~/ui/ui-sidebar'
import type { UiLayoutNavbarLinkGroup } from '~/ui/ui-sidebar-links-group'

export interface UiLayoutProps {
  basePath: string
  headerLinks?: UiHeaderLink[]
  headerProfile?: ReactNode
  footer?: ReactNode
  sidebarLinks?: UiLayoutNavbarLinkGroup[]
}

export function UiLayout({ basePath, headerLinks = [], headerProfile, footer, sidebarLinks = [] }: UiLayoutProps) {
  const hasNavbar = sidebarLinks?.length > 0
  const [opened, { toggle, close }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={
        hasNavbar
          ? {
              width: 300,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }
          : undefined
      }
      padding={0}
      styles={{
        main: { height: '100%', overflow: 'auto', paddingBottom: 40 },
        root: { height: '100%' },
      }}
    >
      <AppShell.Header>
        <UiHeader
          basePath={basePath}
          hasNavbar={hasNavbar}
          links={headerLinks}
          opened={opened}
          profile={headerProfile}
          toggle={toggle}
        />
      </AppShell.Header>
      {hasNavbar ? (
        <AppShell.Navbar>
          <UiSidebar basePath={basePath} close={close} groups={sidebarLinks} />
        </AppShell.Navbar>
      ) : null}
      <AppShell.Main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </AppShell.Main>
      {footer ? <AppShell.Footer>{footer} </AppShell.Footer> : null}
    </AppShell>
  )
}
