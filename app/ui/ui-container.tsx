import { Container, type ContainerProps } from '@mantine/core'
import type { ReactNode } from 'react'
import { useUiBreakpoints } from '~/ui/use-ui-breakpoints'

export interface UiContainerProps extends ContainerProps {
  children: ReactNode
}

export function UiContainer({ children, ...props }: UiContainerProps) {
  const { isSm } = useUiBreakpoints()
  return (
    <Container fluid={isSm} size="xl" px={isSm ? 'xs' : undefined} {...props}>
      {children}
    </Container>
  )
}
