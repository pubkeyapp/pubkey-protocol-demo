import { Button, Text } from '@mantine/core'
import { UiLogo } from '~/ui/ui-logo'
import React from 'react'
import { Link } from 'react-router'

export function ProfileUiPoweredBy() {
  return (
    <Button component={Link} to="/" radius="xl" variant="outline" color="dark" c="dimmed">
      <Text span mr="xs" fz="inherit">
        Powered by
      </Text>
      <UiLogo height={24} width={96} />
    </Button>
  )
}
