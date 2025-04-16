import { Button, Flex } from '@mantine/core'
import { appMeta } from '~/lib/app-meta'
import { Link } from 'react-router'

export function meta() {
  return appMeta('Home')
}

export default function RouteIndex() {
  return (
    <Flex h="100%" align="center" justify="center">
      <Button component={Link} to="/login" size="xl" variant="filled">
        Get Started
      </Button>
    </Flex>
  )
}
