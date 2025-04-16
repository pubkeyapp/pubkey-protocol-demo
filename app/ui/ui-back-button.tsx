import { ActionIcon } from '@mantine/core'
import { LucideArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

export function UiBackButton({ to = './..' }: { to?: string }) {
  return (
    <ActionIcon component={Link} to={to} variant="light" size="sm" mx={1}>
      <LucideArrowLeft size={16} />
    </ActionIcon>
  )
}
