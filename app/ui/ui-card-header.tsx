import { Box, Card, Group, Text } from '@mantine/core'
import type { ReactNode } from 'react'

export function UiCardHeader({
  action,
  title,
  description,
}: {
  title?: string
  action?: ReactNode
  description?: string
}) {
  const showHeader = title || description || action
  return showHeader ? (
    <Card.Section p="md">
      <Group justify="space-between" wrap="nowrap">
        <Box>
          {title ? (
            <Text size="xl" fw={500}>
              {title}
            </Text>
          ) : null}
          {description ? (
            <Text size="sm" c={'dimmed'}>
              {description}
            </Text>
          ) : null}
        </Box>
        {action}
      </Group>
    </Card.Section>
  ) : null
}
