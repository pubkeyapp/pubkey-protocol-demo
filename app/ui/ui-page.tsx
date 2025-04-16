import { Box, Flex, Loader } from '@mantine/core'
import { type ReactNode, Suspense } from 'react'
import { Outlet } from 'react-router'
import { UiPageHeader, type UiPageHeaderProps } from './ui-page-header'

export interface UiPageProps extends UiPageHeaderProps {
  children?: ReactNode
}

export function UiPage({ children = <Outlet />, ...headerProps }: UiPageProps) {
  return (
    <Flex h="100%" direction="column" justify="space-between">
      <UiPageHeader {...headerProps} />
      <Box style={{ flexGrow: 1, overflow: 'auto' }} py="md">
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </Box>
    </Flex>
  )
}
