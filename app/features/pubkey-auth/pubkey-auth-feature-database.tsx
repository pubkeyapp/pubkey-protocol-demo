import { CodeHighlightTabs } from '@mantine/code-highlight'
import { Container, Stack } from '@mantine/core'
import { LucideDatabase } from 'lucide-react'
import { useFetcher } from 'react-router'
import type { Route } from './+types/pubkey-auth-feature-database'
import { appMeta } from '~/lib/app-meta'
import { formData } from '~/lib/form-data'
import { UiCard } from '~/ui/ui-card'
import { UiPage } from '~/ui/ui-page'

import {
  PubkeyAuthUiFormUserFindById,
  PubkeyAuthUiFormUserFindByProvider,
  PubkeyAuthUiFormUserFindByUsername,
} from './ui'
import { handleUserFindById, handleUserFindByProvider, handleUserFindByUsername } from './data-access'

export function meta() {
  return appMeta('Pubkey Auth Databases')
}

enum Action {
  UserFindById = 'UserFindById',
  UserFindByProvider = 'UserFindByProvider',
  UserFindByUsername = 'UserFindByUsername',
}

export async function action(props: Route.ActionArgs) {
  const data = await props.request.formData()
  const action: Action = (data.get('action')?.toString() ?? '') as Action

  try {
    switch (action) {
      case Action.UserFindById:
        return { result: await handleUserFindById(data) }
      case Action.UserFindByProvider:
        return { result: await handleUserFindByProvider(data) }
      case Action.UserFindByUsername:
        return { result: await handleUserFindByUsername(data) }
      default:
        throw new Error(`Unknown action ${action}`)
    }
  } catch (error) {
    return { error: error?.toString() }
  }
}

export default function PubkeyAuthFeatureDatabase() {
  const fetcher = useFetcher()
  const loading = fetcher.state !== 'idle'

  async function submit(action: Action, values: Record<string, string>) {
    await fetcher.submit(formData({ action, ...values }), { method: 'post' })
  }

  return (
    <UiPage title="Database" icon={<LucideDatabase />}>
      <Container>
        <Stack>
          <UiCard title="database.user.findById">
            <PubkeyAuthUiFormUserFindById
              loading={loading}
              submit={async (input) => await submit(Action.UserFindById, { payload: JSON.stringify(input) })}
            />
          </UiCard>
          <UiCard title="database.user.findByProvider">
            <PubkeyAuthUiFormUserFindByProvider
              loading={loading}
              submit={async (input) => await submit(Action.UserFindByProvider, { payload: JSON.stringify(input) })}
            />
          </UiCard>
          <UiCard title="database.user.findByUsername">
            <PubkeyAuthUiFormUserFindByUsername
              loading={loading}
              submit={async (input) => await submit(Action.UserFindByUsername, { payload: JSON.stringify(input) })}
            />
          </UiCard>

          {fetcher.data && !loading ? (
            <CodeHighlightTabs
              defaultExpanded={false}
              code={{
                code: JSON.stringify(fetcher.data, null, 2),
                fileName: 'result.json',
                language: 'json',
              }}
            />
          ) : null}
        </Stack>
      </Container>
    </UiPage>
  )
}
