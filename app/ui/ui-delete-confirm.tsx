import { Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { type ReactNode } from 'react'

export interface UiDeleteConfirmProps {
  children: ReactNode
  title?: ReactNode
  onCancel?: () => void
  onConfirm: () => void
}

export function uiDeleteConfirm({ children, title = 'Are you sure?', onCancel, onConfirm }: UiDeleteConfirmProps) {
  modals.openConfirmModal({
    children: typeof children === 'string' ? <Text>{children}</Text> : children,
    labels: { confirm: 'Delete', cancel: 'Cancel' },
    title,
    onCancel,
    onConfirm,
  })
}
