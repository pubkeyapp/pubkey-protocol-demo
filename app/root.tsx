import type { ReactNode } from 'react'

import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from 'react-router'
import type { Route } from './+types/root'
import './app.css'
import { Box, ColorSchemeScript, Flex, mantineHtmlProps, Text, useMantineColorScheme } from '@mantine/core'
import { Theme, ThemeProvider, useTheme } from 'remix-themes'
import { themeSessionResolver } from '~/lib/sessions.server'
import { UiContextProvider } from '~/ui/ui-context-provider'
import { UiThemeProvider } from '~/ui/ui-theme-provider'

const defaultTheme = Theme.DARK

export const links: Route.LinksFunction = () => []

export async function loader({ request }: Route.LoaderArgs) {
  const { getTheme } = await themeSessionResolver(request)
  const theme = getTheme() ?? defaultTheme

  return { theme }
}

export function Layout({ children }: { children: ReactNode }) {
  const { theme } = useLoaderData<typeof loader>() ?? { theme: defaultTheme }
  return (
    <ThemeProvider specifiedTheme={theme} themeAction="/api/set-theme">
      <LayoutDocument>{children}</LayoutDocument>
    </ThemeProvider>
  )
}

function LayoutDocument({ children }: { children: ReactNode }) {
  const [theme] = useTheme()
  const colorScheme: 'dark' | 'light' = theme === 'dark' ? 'dark' : 'light'
  return (
    <html lang="en" {...mantineHtmlProps} data-mantine-color-scheme={colorScheme}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <ColorSchemeScript forceColorScheme={colorScheme} />
        <Meta />
        <Links />
      </head>
      <body>
        <UiThemeProvider colorScheme={colorScheme}>{children}</UiThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const { colorScheme } = useMantineColorScheme()
  const isDark = colorScheme === 'dark'
  return (
    <UiContextProvider config={{ name: 'PubKey', logo: isDark ? '/logo-dark.png' : '/logo-light.png' }}>
      <Outlet />
    </UiContextProvider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <Flex component="main" direction="column" mx="auto" p="xl" py="xl">
      <Text fw="bold" size="xl">
        {message}
      </Text>
      <Text>{details}</Text>
      {stack && (
        <Box component="pre" style={{ overflowX: 'auto' }} w="100%">
          <code>{stack}</code>
        </Box>
      )}
    </Flex>
  )
}

// Patch BigInt so we can log it using JSON.stringify without any errors
;(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString()
}
