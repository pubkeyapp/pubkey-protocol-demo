import { Container } from '@mantine/core'
import { appMeta } from '~/lib/app-meta'

export function meta() {
  return appMeta('Index')
}

export default function DevFeatureIndex() {
  const items: string[] = new Array(100).fill(0).map((i) => i.toString())
  return (
    <Container h="100%" style={{ overflow: 'auto' }} p="xs">
      {items.map((item, index) => (
        <div key={item}>Index {index}</div>
      ))}
    </Container>
  )
}
