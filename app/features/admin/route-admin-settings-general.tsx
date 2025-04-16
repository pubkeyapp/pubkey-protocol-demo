import { Stack } from '@mantine/core'
import { LucideSettings } from 'lucide-react'
import { appMeta } from '~/lib/app-meta'
import { UiCard } from '~/ui/ui-card'
import { UiContainer } from '~/ui/ui-container'
import { UiPage } from '~/ui/ui-page'

export function meta() {
  return appMeta('General | Settings | Admin')
}

export default function RouteAdminSettingsGeneral() {
  return (
    <UiPage title="General" icon={<LucideSettings />}>
      <UiContainer>
        <Stack>
          <UiCard title="Test">Test</UiCard>
          <UiCard title="Test">Test</UiCard>
        </Stack>
      </UiContainer>
    </UiPage>
  )
}
