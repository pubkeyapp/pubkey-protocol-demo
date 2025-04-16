import { Anchor } from '@mantine/core'
import { Link } from 'react-router'
import { type AppLogoProps, UiLogo } from './ui-logo'

export function UiLogoLink({ to = '/', ...props }: AppLogoProps & { to?: string }) {
  return (
    <Anchor component={Link} to={to} underline="never">
      <UiLogo {...props} />
    </Anchor>
  )
}
