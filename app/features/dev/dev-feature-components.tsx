import { Container } from '@mantine/core'
import { appMeta } from '~/lib/app-meta'
import { UiStack } from '~/ui/ui-stack'
import { UiCard } from '~/ui/ui-card'
import { UiAlert, UiError, UiInfo, UiSuccess, UiWarning } from '~/ui/ui-alert'

export function meta() {
  return appMeta('Components')
}

export default function DevFeatureComponents() {
  const items: string[] = new Array(100).fill(0).map((i) => i.toString())
  return (
    <Container h="100%" style={{ overflow: 'auto' }} p="xs">
      <UiStack>
        <ComponentsUiAlert />
        {items.map((item, index) => (
          <div key={item}>Components {index}</div>
        ))}
      </UiStack>
    </Container>
  )
}

function ComponentsUiAlert() {
  return (
    <UiCard title="UiAlert">
      <UiStack>
        <UiAlert title="Alert Title" message="Alert Message goes Here!" />
        <UiInfo title="Info Title" message="Info Message goes Here!" />
        <UiSuccess title="Success Title" message="Success Message goes Here!" />
        <UiError title="Error Title" message="Error Message goes Here!" />
        <UiWarning title="Warning Title" message="Warning Message goes Here!" />
      </UiStack>
    </UiCard>
  )
}
