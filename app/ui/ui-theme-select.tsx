import { Select } from '@mantine/core'
import { Theme } from 'remix-themes'
import { useThemes } from '~/ui/use-themes'

export function UiThemeSelect() {
  const { theme, setTheme, themes } = useThemes()

  return (
    <Select
      allowDeselect={false}
      onChange={(value) => setTheme(value as Theme)}
      value={theme?.toString()}
      data={themes.map(({ label, value }) => ({ label, value }))}
    />
  )
}
