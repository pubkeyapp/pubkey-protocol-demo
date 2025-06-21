import { Button, Divider, Flex, Stack } from '@mantine/core'
import { appMeta } from '~/lib/app-meta'
import { Link } from 'react-router'

export function meta() {
  return appMeta('Home')
}

export default function RouteIndex() {
  return (
    <Flex h="100%" align="center" justify="center">
      <Stack>
        <Button component={Link} to="/profile" size="xl" variant="filled">
          Get Started
        </Button>
        <Button component={Link} to="/pubkey" size="xl" variant="filled">
          PubKey
        </Button>
        <Divider />
        <Button component={Link} to="/api/auth/local" size="xl" variant="outline">
          Local Sign Up
        </Button>
        <Button component={Link} to="/api/auth/google" size="xl" variant="outline">
          Google Sign Up
        </Button>
      </Stack>
    </Flex>
  )
}
