import { ActionIcon, CopyButton as CopyButtonMantine, rem, Tooltip } from '@mantine/core'
import { LucideCopy, LucideCopyCheck } from 'lucide-react'

export function UiCopyButton({ value }: { value: string }) {
  return (
    <CopyButtonMantine value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
            {copied ? <LucideCopyCheck style={{ width: rem(16) }} /> : <LucideCopy style={{ width: rem(16) }} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButtonMantine>
  )
}
