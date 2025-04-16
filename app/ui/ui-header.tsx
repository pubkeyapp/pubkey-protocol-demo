import { Burger, Button, Group } from '@mantine/core'
import type { ReactNode } from 'react'
import { NavLink as Link, useLocation } from 'react-router'
import { UiLogoLink } from '~/ui/ui-logo-link'
import { UiThemeToggle } from '~/ui/ui-theme-toggle'

export interface UiHeaderLink {
  label: string
  to: string
}

export interface UiHeaderProps {
  basePath?: string
  hasNavbar?: boolean
  links?: UiHeaderLink[]
  opened?: boolean
  profile?: ReactNode
  toggle?: () => void
}

export function UiHeader({ basePath = '/', hasNavbar = false, links = [], opened, profile, toggle }: UiHeaderProps) {
  const { pathname } = useLocation()
  return (
    <Group justify="space-between" align="center" h="100%" px="xs" wrap="nowrap">
      <Group justify="center" align="center" wrap="nowrap">
        {hasNavbar ? <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> : null}
        <UiLogoLink size={32} />
        {links.length ? (
          <Group wrap="nowrap" gap="xs">
            {links.map((link) => {
              const isActive = basePath === pathname ? pathname === link.to : pathname.startsWith(link.to)
              return (
                <Button size="xs" key={link.to} component={Link} to={link.to} variant={isActive ? 'filled' : 'light'}>
                  {link.label}
                </Button>
              )
            })}
          </Group>
        ) : null}
      </Group>
      <Group justify="center" align="center" wrap="nowrap" gap="xs">
        <UiThemeToggle />
        {profile}
      </Group>
    </Group>
  )
}
