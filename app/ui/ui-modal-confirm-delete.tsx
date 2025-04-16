import { Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { type ReactNode } from 'react'

export function uiModalConfirmDelete({
  children,
  title = 'Are you sure?',
  onCancel,
  onConfirm,
}: {
  children: ReactNode
  title?: ReactNode
  onCancel?: () => void
  onConfirm: () => void
}) {
  modals.openConfirmModal({
    children: typeof children === 'string' ? <Text size="sm">{children}</Text> : children,
    labels: { confirm: 'Delete', cancel: 'Cancel' },
    title,
    onCancel,
    onConfirm,
  })
}
