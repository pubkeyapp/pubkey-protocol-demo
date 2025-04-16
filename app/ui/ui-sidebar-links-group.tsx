import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import { LucideChevronRight, type LucideProps } from 'lucide-react'
import { type ForwardRefExoticComponent, type RefAttributes, useState } from 'react'
import { Link, useLocation } from 'react-router'
import classes from './ui-sidebar-links-group.module.css'

export interface UiLayoutNavbarLinkGroup {
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  label: string
  to?: string
  links?: UiLayoutNavbarLink[]
}

export interface UiLayoutNavbarLink {
  label: string
  to: string
}

export function UiSidebarLinksGroup({
  basePath,
  icon: Icon,
  label,
  links,
  close,
  to,
}: UiLayoutNavbarLinkGroup & { basePath: string; close: () => void }) {
  const { pathname } = useLocation()
  const isActive = basePath === to ? pathname === basePath : pathname.startsWith(to ?? '')
  const initiallyOpened = links?.length ? links.some((link) => pathname.startsWith(link.to)) : false
  const hasLinks = Array.isArray(links)
  const [opened, setOpened] = useState(initiallyOpened || false)
  const items = (hasLinks ? links : []).map((link) => {
    const isActive = basePath === pathname ? pathname === link.to : link.to?.startsWith(pathname)
    return (
      <Text
        component={Link}
        className={classes.link}
        to={link.to}
        key={link.label}
        onClick={close}
        data-active={isActive}
      >
        {link.label}
      </Text>
    )
  })

  const content = (
    <Group justify="space-between" gap={0}>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        {Icon ? (
          <ThemeIcon variant="light" size={30}>
            <Icon size={18} />
          </ThemeIcon>
        ) : null}
        <Box ml="md">{label}</Box>
      </Box>
      {hasLinks && (
        <LucideChevronRight
          className={classes.chevron}
          size={16}
          style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
        />
      )}
    </Group>
  )
  return to ? (
    <UnstyledButton
      component={Link}
      to={to}
      className={`${classes.control} ${isActive ? 'active' : 'active'}`}
      data-active={isActive}
      onClick={close}
    >
      {content}
    </UnstyledButton>
  ) : (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        {content}
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}
