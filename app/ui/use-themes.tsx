import { Theme, useTheme } from 'remix-themes'

const themes: { label: string; value: Theme }[] = [
  { label: 'Light', value: Theme.LIGHT },
  { label: 'Dark', value: Theme.DARK },
]

export function useThemes() {
  const [theme, setTheme] = useTheme()

  return {
    isDark: theme === Theme.DARK,
    setTheme,
    theme,
    themes,
  }
}
