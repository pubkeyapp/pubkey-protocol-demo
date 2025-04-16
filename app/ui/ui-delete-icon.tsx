import { ActionIcon, type ActionIconProps } from '@mantine/core'
import { LucideTrash2 } from 'lucide-react'
import { type UiDeleteConfirmProps, uiDeleteConfirm } from '~/ui/ui-delete-confirm'

export function UiDeleteIcon({ confirm, ...props }: ActionIconProps & { confirm: UiDeleteConfirmProps }) {
  return (
    <ActionIcon variant="light" size="sm" color="red" {...props} onClick={() => uiDeleteConfirm(confirm)}>
      <LucideTrash2 size={14} />
    </ActionIcon>
  )
}
