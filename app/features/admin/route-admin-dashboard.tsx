import { Stack } from '@mantine/core'
import { LucideLayoutDashboard } from 'lucide-react'
import { appMeta } from '~/lib/app-meta'
import { UiCard } from '~/ui/ui-card'
import { UiContainer } from '~/ui/ui-container'
import { UiPage } from '~/ui/ui-page'

export function meta() {
  return appMeta('Dashboard | Admin')
}

export default function RouteAdminDashboard() {
  return (
    <UiPage title="Admin Dashboard" icon={<LucideLayoutDashboard />}>
      <UiContainer>
        <Stack>
          <UiCard title="Test">Test</UiCard>
          <UiCard title="Test">Test</UiCard>
        </Stack>
      </UiContainer>
    </UiPage>
  )
}
