import { Text, type TextProps } from '@mantine/core'
import type { ReactNode } from 'react'

export function UiLabelTitle(props: TextProps & { children: ReactNode }) {
  return (
    <Text fz="xs" tt="uppercase" fw={700} c="dimmed" {...props}>
      {props.children}
    </Text>
  )
}
