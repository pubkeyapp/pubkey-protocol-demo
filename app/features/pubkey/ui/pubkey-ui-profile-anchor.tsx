import { Anchor, type AnchorProps, Text } from '@mantine/core'
import type { PubKeyProfile } from '@pubkey-protocol/sdk'
import { Link } from 'react-router'

export interface PubkeyUiProfileAnchorProps extends AnchorProps {
  profile: PubKeyProfile
  to?: string
}

export function PubkeyUiProfileAnchor({ profile, to, ...props }: PubkeyUiProfileAnchorProps) {
  return to?.length ? (
    <Anchor component={Link} to={to} size="xl" fw="bold" {...props}>
      {profile.name}
    </Anchor>
  ) : (
    <Text size="xl" fw="bold" {...props}>
      {profile.name}
    </Text>
  )
}
