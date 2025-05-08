import { Card, Flex, type FlexProps, Stack, Text } from '@mantine/core'
import React from 'react'

export interface OnboardingUiPageProps extends FlexProps {
  children: React.ReactNode
  description: string
  title: string
}

export function OnboardingUiPage({ children, description, title, ...props }: OnboardingUiPageProps) {
  return (
    <Flex direction="column" justify="center" align="center" h="100%" style={{ overflow: 'auto' }} {...props}>
      <Card withBorder radius="lg" miw={400} mih={200} p="md" style={{ overflow: 'auto' }}>
        <Card.Section p="md" pb={0}>
          <Stack gap={0}>
            <Text size="xl" fw={500} span>
              {title}
            </Text>
            <Text size="sm" c="dimmed" span>
              {description}
            </Text>
          </Stack>
        </Card.Section>
        <Card.Section p="sm">
          <Stack style={{ overflow: 'auto' }} py="md">
            {children}
          </Stack>
        </Card.Section>
      </Card>
    </Flex>
  )
}
