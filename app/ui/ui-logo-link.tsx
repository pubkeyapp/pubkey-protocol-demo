import { Anchor } from '@mantine/core'
import { Link } from 'react-router'
import { UiLogo, type UiLogoProps } from './ui-logo'

export function UiLogoLink({ to = '/', ...props }: UiLogoProps & { to?: string }) {
  return (
    <Anchor component={Link} to={to} underline="never">
      <UiLogo height={24} width={96} {...props} />
    </Anchor>
  )
}
