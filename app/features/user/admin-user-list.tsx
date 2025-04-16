import { Button } from '@mantine/core'
import { LucideUsers } from 'lucide-react'
import { Link, useFetcher } from 'react-router'
import { adminUserDelete } from '~/features/user/data-access/admin-user-delete'
import { appMeta } from '~/lib/app-meta'
import { UiContainer } from '~/ui/ui-container'
import { UiPage } from '~/ui/ui-page'
import type { Route } from './+types/admin-user-list'
import { userFindMany } from './data-access/user-find-many'
import { UserUiTable } from './ui/user-ui-table'

export async function loader() {
  const items = await userFindMany()

  return { items }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  const userId = formData.get('userId')?.toString() ?? ''
  if (!userId.trim()) {
    throw new Error('userId is required')
  }

  const item = await adminUserDelete(userId)

  return { item }
}

export function meta() {
  return appMeta('Users')
}

export default function AdminUserList({ loaderData: { items } }: Route.ComponentProps) {
  const fetcher = useFetcher()
  return (
    <UiPage
      action={
        <Button component={Link} to="./create" variant="light" size="sm">
          Add User
        </Button>
      }
      icon={<LucideUsers />}
      title="Users"
    >
      <UiContainer>
        <UserUiTable
          items={items}
          deleteItem={(userId: string) => {
            const data = new FormData()
            data.append('action', 'delete')
            data.append('userId', userId)
            return fetcher.submit(data, { method: 'post' })
          }}
        />
      </UiContainer>
    </UiPage>
  )
}
