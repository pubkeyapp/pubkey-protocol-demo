import { Stack, type StackProps } from '@mantine/core'
import type { ReactNode } from 'react'
import { useUiBreakpoints } from './use-ui-breakpoints'

export interface UiStackProps extends StackProps {
  children: ReactNode
}

export function UiStack({ children, ...props }: UiStackProps) {
  const { isSm } = useUiBreakpoints()
  return (
    <Stack gap={isSm ? 'xs' : 'md'} {...props}>
      {children}
    </Stack>
  )
}
