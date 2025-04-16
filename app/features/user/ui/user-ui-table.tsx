import { Anchor, Table, type TableProps, Text } from '@mantine/core'
import { Link } from 'react-router'
import type { User } from '~/lib/db.server'
import { UiDeleteIcon } from '~/ui/ui-delete-icon'
import { UserUiItem } from './user-ui-avatar'

export function UserUiTable({
  items,
  deleteItem,
  ...props
}: TableProps & {
  items: User[]
  deleteItem: (id: string) => Promise<void>
}) {
  return (
    <Table withTableBorder {...props}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w={200}>Username</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th w={100} ta="right">
            Admin
          </Table.Th>
          <Table.Th w={100} ta="right">
            Actions
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {items.length ? (
          items.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>
                <Anchor component={Link} to={`./${item.id}`}>
                  <UserUiItem user={item} />
                </Anchor>
              </Table.Td>
              <Table.Td>{item.name}</Table.Td>
              <Table.Td ta="right">{item.admin ? 'Yes' : 'No'}</Table.Td>
              <Table.Td ta="right">
                <UiDeleteIcon
                  confirm={{
                    children: (
                      <Text>
                        Are you sure you want to delete <strong>{item.username}</strong>?
                      </Text>
                    ),
                    onConfirm: async () => await deleteItem(item.id),
                    title: 'Delete user',
                  }}
                />
              </Table.Td>
            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td colSpan={3} ta="center">
              No users found
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  )
}
