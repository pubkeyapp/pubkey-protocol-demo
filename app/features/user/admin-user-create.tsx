import { Container } from '@mantine/core'
import { LucideUserPlus } from 'lucide-react'
import { redirect, useFetcher } from 'react-router'
import { adminUserCreate } from '~/features/user/data-access/admin-user-create'
import { appMeta } from '~/lib/app-meta'
import { UiPage } from '~/ui/ui-page'
import type { Route } from './+types/admin-user-create'
import { UserUiFormCreate } from './ui/user-ui-form-create'

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  const username = formData.get('username')?.toString() ?? ''
  if (username.trim().length < 3) {
    throw new Error('Username must be at least 3 characters')
  }

  const item = await adminUserCreate({
    avatarUrl: formData.get('avatarUrl')?.toString(),
    name: formData.get('name')?.toString(),
    username,
  })

  if (item) {
    return redirect(`./../${item.id}`)
  }
  return { item }
}

export function meta() {
  return appMeta('User create')
}

export default function AdminUserCreate() {
  const fetcher = useFetcher()
  return (
    <UiPage icon={<LucideUserPlus />} title="User Create">
      <Container>
        <fetcher.Form method="post">
          <UserUiFormCreate />
        </fetcher.Form>
      </Container>
    </UiPage>
  )
}
