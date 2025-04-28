import React from 'react'
import { UiFooter } from '~/ui/ui-footer'
import { UiLayout } from '~/ui/ui-layout'
import { UiProfileMenu } from '~/ui/ui-profile-menu'
import type { Route } from './+types/layout-onboarding'

export async function loader({ request }: Route.LoaderArgs) {
  // const user = await ensureUser(request)
  // if (!user) {
  //   return redirect('/login')
  // }
  // if (!user.admin) {
  //   logger.info({ event: 'auth_layout_app_redirect', message: 'User not admin' })
  //   return redirect('/dashboard')
  // }

  return { user: null }
}

export default function LayoutAdmin({ loaderData: { user } }: Route.ComponentProps) {
  return (
    <UiLayout
      basePath="/onboarding"
      headerLinks={[
        { label: 'Socials', to: '/onboarding' },
        { label: 'Wallets', to: '/onboarding/wallets' },
        { label: 'Profile', to: '/onboarding/profile' },
        { label: 'Done', to: '/onboarding/done' },
      ]}
      headerProfile={user ? <UiProfileMenu user={user} /> : null}
      footer={<UiFooter />}
    />
  )
}
