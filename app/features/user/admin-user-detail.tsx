import { Container, Stack } from '@mantine/core'
import { LucideUser } from 'lucide-react'
import { useFetcher } from 'react-router'
import { adminUserUpdate } from '~/features/user/data-access/admin-user-update'
import { appMeta } from '~/lib/app-meta'
import { UiPage } from '~/ui/ui-page'
import type { Route } from './+types/admin-user-detail'
import { userFindById } from './data-access/user-find-by-id'
import { UserUiItem } from './ui/user-ui-avatar'
import { UserUiFormUpdate } from './ui/user-ui-form-update'

export async function loader({ params: { id } }: Route.LoaderArgs) {
  const item = await userFindById(id)

  return { item }
}

export async function action({ request, params: { id } }: Route.ActionArgs) {
  const formData = await request.formData()

  const action = formData.get('action')?.toString() ?? ''

  if (action === 'update') {
    const username = formData.get('username')?.toString() ?? ''

    if (username.trim().length < 3) {
      throw new Error('Username must be at least 3 characters')
    }

    const item = await adminUserUpdate(id, {
      username,
      name: formData.get('name')?.toString(),
      avatarUrl: formData.get('avatarUrl')?.toString(),
      admin: formData.get('admin') === 'on',
    })

    return { item }
  }
}

export function meta(meta: Route.MetaArgs) {
  return appMeta(`${meta.data.item?.username} - User detail`)
}

export default function AdminUserDetail({ loaderData: { item } }: Route.ComponentProps) {
  const fetcher = useFetcher()
  if (!item) {
    return <div>User not found</div>
  }
  return (
    <UiPage icon={<LucideUser />} title="User detail">
      <Container>
        <Stack>
          <UserUiItem user={item} />
          <fetcher.Form method="post">
            <UserUiFormUpdate user={item} />
          </fetcher.Form>
        </Stack>
      </Container>
    </UiPage>
  )
}
