import { ActionIcon, type ActionIconProps } from '@mantine/core'
import { LucideMoon, LucideSun } from 'lucide-react'
import { Theme } from 'remix-themes'
import { useThemes } from '~/ui/use-themes'

export function UiThemeToggle({ iconSize = 20, ...props }: ActionIconProps & { iconSize?: number }) {
  const { isDark, setTheme } = useThemes()

  return (
    <ActionIcon
      onClick={() => setTheme(isDark ? Theme.LIGHT : Theme.DARK)}
      color={isDark ? 'dark' : 'light'}
      variant="subtle"
      {...props}
    >
      {isDark ? <LucideSun size={iconSize} /> : <LucideMoon size={iconSize} />}
    </ActionIcon>
  )
}
