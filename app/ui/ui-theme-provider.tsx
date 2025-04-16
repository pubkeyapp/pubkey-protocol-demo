import { createTheme, DEFAULT_THEME, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import type { ReactNode } from 'react'

const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: DEFAULT_THEME.colors.blue,
  },
})

export function UiThemeProvider({ children, colorScheme }: { children: ReactNode; colorScheme: 'light' | 'dark' }) {
  return (
    <MantineProvider forceColorScheme={colorScheme} theme={theme}>
      <Notifications />
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  )
}
