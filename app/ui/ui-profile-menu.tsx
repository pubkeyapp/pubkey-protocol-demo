import { Avatar, Button, Menu } from '@mantine/core'
import { LucideLogOut, LucideShieldCheck, LucideUser } from 'lucide-react'
import { Link } from 'react-router'
import type { User } from '~/lib/db.server'

export function UiProfileMenu({ user }: { user: User }) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button size="xs" variant="light" leftSection={<Avatar src={user.avatarUrl} size="xs" />}>
          {user.username}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {user.admin ? (
          <Menu.Item component={Link} to="/admin" leftSection={<LucideShieldCheck size={14} />}>
            Admin
          </Menu.Item>
        ) : null}
        <Menu.Item component={Link} to={`/u/${user.username}`} leftSection={<LucideUser size={14} />}>
          My Profile
        </Menu.Item>
        <Menu.Item component={Link} to="/profile" leftSection={<LucideUser size={14} />}>
          Manage Profile
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item component={Link} to="/logout" leftSection={<LucideLogOut size={14} />}>
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
