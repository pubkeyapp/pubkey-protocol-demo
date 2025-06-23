import { Button, type ButtonProps, Text } from '@mantine/core'
import { UiLogo } from '~/ui/ui-logo'
import React from 'react'
import { Link } from 'react-router'

export function ProfileUiPoweredBy({ to, ...props }: ButtonProps & { to: string }) {
  return (
    <Button component={Link} to={to} radius="xl" variant="outline" color="dark" c="dimmed" {...props}>
      <Text span mr="sm" fz="inherit">
        Powered by
      </Text>
      <UiLogo height={24} width={96} />
    </Button>
  )
}
