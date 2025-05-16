import { appMeta } from '~/lib/app-meta'
import type { Route } from './+types/pubkey-auth-feature-index'
import { useFetcher } from 'react-router'
import { LucideLayoutDashboard } from 'lucide-react'
import { UiPage } from '~/ui/ui-page'

export function meta() {
  return appMeta('Pubkey Auth Index')
}

export async function loader() {
  return { config: 'foo' }
}

export default function PubkeyAuthFeatureIndex({ loaderData: { config } }: Route.ComponentProps) {
  const fetcher = useFetcher()

  return (
    <UiPage title="Dashboard" icon={<LucideLayoutDashboard />}>
      PUBKEY AUTH
    </UiPage>
  )
}
