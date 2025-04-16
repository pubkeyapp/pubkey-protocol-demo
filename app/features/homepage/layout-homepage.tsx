import { Button } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router'
import { getUser } from '~/features/auth/data-access/get-user'
import { UiFooter } from '~/ui/ui-footer'
import { UiLayout } from '~/ui/ui-layout'
import { UiProfileMenu } from '~/ui/ui-profile-menu'
import type { Route } from './+types/layout-homepage'

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request)

  return { user }
}

export default function LayoutHomepage({ loaderData: { user } }: Route.ComponentProps) {
  const headerProfile = user ? (
    <UiProfileMenu user={user} />
  ) : (
    <Button component={Link} to="/login" variant="light" size="xs">
      Login
    </Button>
  )
  return <UiLayout basePath="/" headerLinks={[]} headerProfile={headerProfile} footer={<UiFooter />} />
}
