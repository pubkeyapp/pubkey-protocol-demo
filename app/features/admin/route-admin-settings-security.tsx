import { Stack } from '@mantine/core'
import { LucideLock } from 'lucide-react'
import { appMeta } from '~/lib/app-meta'
import { UiCard } from '~/ui/ui-card'
import { UiContainer } from '~/ui/ui-container'
import { UiPage } from '~/ui/ui-page'

export function meta() {
  return appMeta('Security | Settings | Admin')
}

export default function RouteAdminSettingsSecurity() {
  return (
    <UiPage title="Security" icon={<LucideLock />}>
      <UiContainer>
        <Stack>
          <UiCard title="Test">Test</UiCard>
          <UiCard title="Test">Test</UiCard>
        </Stack>
      </UiContainer>
    </UiPage>
  )
}
