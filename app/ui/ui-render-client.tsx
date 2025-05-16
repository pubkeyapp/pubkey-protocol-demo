import { type ReactNode, useEffect, useState } from 'react'
import { Flex, Loader } from '@mantine/core'

export function UiRenderClient({ children }: { children: ReactNode }) {
  const [rendered, setRendered] = useState(false)
  useEffect(() => setRendered(true), [])
  return rendered ? (
    children
  ) : (
    <Flex justify="center" py="xs">
      <Loader size="xs" type="dots" />
    </Flex>
  )
}
