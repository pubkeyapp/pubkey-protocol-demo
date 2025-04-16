import { Avatar, Button, Menu, Text } from '@mantine/core'
import { LucideLayoutDashboard, LucideLogOut, LucideSettings, LucideShieldCheck, LucideUser } from 'lucide-react'
import { Link } from 'react-router'
import type { User } from '~/lib/db.server'

export function UiProfileMenu({ user }: { user: User }) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button size="xs" variant="light" leftSection={<Avatar src={user.avatarUrl} size="xs"/>}>
          {user.username}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {user.admin ? (
          <Menu.Item component={Link} to="/admin" leftSection={<LucideShieldCheck size={14}/>}>
            Admin
          </Menu.Item>
        ) : null}
        <Menu.Item component={Link} to="/dashboard" leftSection={<LucideLayoutDashboard size={14}/>}>
          Dashboard
        </Menu.Item>
        <Menu.Item component={Link} to="/profile" leftSection={<LucideUser size={14}/>}>
          Profile
        </Menu.Item>
        <Menu.Item disabled leftSection={<LucideSettings size={14}/>} rightSection={<ComingSoon/>}>
          Settings
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item component={Link} to="/logout" leftSection={<LucideLogOut size={14}/>}>
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

function ComingSoon() {
  return (
    <Text size="xs" c="dimmed">
      Coming soon
    </Text>
  )
}
