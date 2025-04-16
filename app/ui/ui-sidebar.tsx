import { Box, Flex, ScrollArea } from '@mantine/core'
import classes from './ui-sidebar.module.css'
import { type UiLayoutNavbarLinkGroup, UiSidebarLinksGroup } from './ui-sidebar-links-group'

export interface UiSidebarProps {
  basePath: string
  close: () => void
  groups: UiLayoutNavbarLinkGroup[]
}

export function UiSidebar({ basePath, groups, close }: UiSidebarProps) {
  const items = groups.map((item) => (
    <UiSidebarLinksGroup {...item} key={item.label} basePath={basePath} close={close} />
  ))

  return (
    <Flex component="nav" h="100%" direction="column" px="md">
      <ScrollArea className={classes.links} display="flex">
        <Box>{items}</Box>
      </ScrollArea>
    </Flex>
  )
}
