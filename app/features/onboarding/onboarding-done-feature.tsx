import { Link } from 'react-router'
import { Anchor, Card, Flex, Stack, Text } from '@mantine/core'
import React from 'react'

export default function OnboardingFeature() {
  return (
    <Flex direction="column" justify="center" align="center" h="100%" style={{ overflow: 'auto' }}>
      <Card withBorder radius="lg" miw={400} mih={200} p="md" style={{ overflow: 'auto' }}>
        <Card.Section p="md" pb={0}>
          <Stack gap={0}>
            <Text size="xl" fw={500} span>
              Onboarding Done
            </Text>
            <Text size="sm" c="dimmed" span>
              You are now ready to use the app.
            </Text>
          </Stack>
        </Card.Section>
        <Card.Section p="sm">
          <Stack style={{ overflow: 'auto' }} py="md">
            <Anchor component={Link} to="/dashboard">
              Go to Dashboard
            </Anchor>
          </Stack>
        </Card.Section>
      </Card>
    </Flex>
  )
}
