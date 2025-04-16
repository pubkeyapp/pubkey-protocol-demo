import { Table, type TableProps } from '@mantine/core'
import type { ReactNode } from 'react'

export type UiInfoItem = [ReactNode, ReactNode] | undefined
export type UiInfoItems = UiInfoItem[]
export type UiInfoTableProps = TableProps & { items: UiInfoItems; tdw?: string }

export function UiInfoTable({ items, tdw = '25%', ...props }: UiInfoTableProps) {
  const filtered = items.filter(Boolean) as [ReactNode, ReactNode][]
  if (!filtered.length) return null
  return (
    <Table {...props}>
      <Table.Tbody variant="vertical">
        {filtered.map(([key, value], index) => (
          <Table.Tr key={index.toString()}>
            <Table.Td w={tdw}>{key}</Table.Td>
            <Table.Th>{value}</Table.Th>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
