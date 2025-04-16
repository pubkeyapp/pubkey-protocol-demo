import { type DefaultMantineColor, useMantineTheme } from '@mantine/core'
import { useThemes } from '~/ui/use-themes'

export function useThemeColor([darkColor, darkIndex, lightColor, lightIndex]: [
  DefaultMantineColor,
  number,
  DefaultMantineColor,
  number,
]) {
  const { colors } = useMantineTheme()
  const { isDark } = useThemes()

  return isDark ? colors[darkColor][darkIndex] : colors[lightColor][lightIndex]
}
