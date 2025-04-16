import { Button, Stack, Text } from '@mantine/core'
import { data, useFetcher } from 'react-router'
import { appMeta } from '~/lib/app-meta'
import { formData } from '~/lib/form-data'
import { UiContainer } from '~/ui/ui-container'
import { UiPage } from '~/ui/ui-page'
import type { Route } from './+types/route-todo'
import { prismaTodoCreate } from './todo/data-access/prisma-todo-create'
import { prismaTodoDelete } from './todo/data-access/prisma-todo-delete'
import { prismaTodoFindAll } from './todo/data-access/prisma-todo-find-all'
import { prismaTodoToggle } from './todo/data-access/prisma-todo-toggle'
import { TodoUiList } from './todo/ui/todo-ui-list'

export function meta() {
  return appMeta('Todos')
}

export async function loader() {
  return { items: await prismaTodoFindAll() }
}

export async function action({ request }: Route.ActionArgs) {
  const body: FormData = await request.formData()
  switch (body.get('action')) {
    case 'create':
      return data({ created: await prismaTodoCreate(body) })
    case 'delete':
      return data({ deleted: await prismaTodoDelete(body) })
    case 'toggle':
      return data({ toggled: await prismaTodoToggle(body) })
    default:
      throw new Error('Invalid action')
  }
}

export default function RouteTodo({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData
  const fetcher = useFetcher()

  return (
    <UiContainer py="md">
      <UiPage
        title="Todos"
        action={
          <Button
            type="button"
            onClick={async () => {
              const title = prompt('Todo name', `Todo ${Date.now()}`)
              if (!title) {
                return
              }
              await fetcher.submit(formData({ action: 'create', title }), { method: 'post' })
            }}
          >
            New todo
          </Button>
        }
      >
        <Stack gap="xl">
          {items?.length ? (
            <TodoUiList
              items={items}
              deleteTodo={(id) => fetcher.submit(formData({ action: 'delete', id }), { method: 'post' })}
              toggleTodo={(id) => fetcher.submit(formData({ action: 'toggle', id }), { method: 'post' })}
            />
          ) : (
            <Text>You have no todos yet. Create one to get started.</Text>
          )}
        </Stack>
      </UiPage>
    </UiContainer>
  )
}
