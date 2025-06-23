import { Button, type ButtonProps } from '@mantine/core'
import type { useFetcher } from 'react-router'
import type { ReactNode } from 'react'

export function SolanaSignMessageButton({
  children = 'Verify by signing a message',
  fetcher,
  publicKey,
  onClick,
  ...props
}: ButtonProps & {
  fetcher: ReturnType<typeof useFetcher>
  children?: ReactNode
  publicKey: string
  onClick: () => void
}) {
  return (
    <Button disabled={!publicKey} loading={fetcher.state === 'submitting'} onClick={onClick} {...props}>
      {children}
    </Button>
  )
}
