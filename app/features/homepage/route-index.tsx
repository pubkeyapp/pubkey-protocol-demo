import { Button, Flex, Stack } from '@mantine/core'
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
      </Stack>
    </Flex>
  )
}
