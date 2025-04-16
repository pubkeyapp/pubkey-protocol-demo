import { ActionIcon, type ActionIconProps } from '@mantine/core'
import { LucideMoon, LucideSun } from 'lucide-react'
import { Theme } from 'remix-themes'
import { useThemes } from '~/ui/use-themes'

export function UiThemeToggle(props: ActionIconProps) {
  const { isDark, setTheme } = useThemes()

  return (
    <ActionIcon onClick={() => setTheme(isDark ? Theme.LIGHT : Theme.DARK)} variant="light" {...props}>
      {isDark ? <LucideSun size={20} /> : <LucideMoon size={20} />}
    </ActionIcon>
  )
}
