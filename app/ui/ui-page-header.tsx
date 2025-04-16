import { Flex, Group, Text } from '@mantine/core'
import { type ReactNode } from 'react'

import { useThemeColor } from '~/ui/use-theme-color'

export interface UiPageHeaderProps {
  title?: ReactNode
  icon?: ReactNode
  action?: ReactNode
}

export function UiPageHeader({ action, icon, title }: UiPageHeaderProps) {
  const bg = useThemeColor(['dark', 8, 'gray', 0])

  return (
    <Flex mih={50} justify="space-between" align="center" wrap="nowrap" bg={bg} px="md">
      {icon || title ? (
        <Group justify="center" align="center" wrap="nowrap" gap="xs">
          {icon ? icon : null}
          {typeof title === 'string' ? (
            <Text size="lg" span fw={700}>
              {title}
            </Text>
          ) : (
            title
          )}
        </Group>
      ) : (
        <Group />
      )}
      {action ? (
        <Group justify="center" align="center" wrap="nowrap" gap="xs">
          {action}
        </Group>
      ) : null}
    </Flex>
  )
}
