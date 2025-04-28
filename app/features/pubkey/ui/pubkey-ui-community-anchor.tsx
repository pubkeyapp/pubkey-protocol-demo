import { Anchor, Text, type TextProps } from '@mantine/core'
import { type PubKeyCommunity } from '@pubkey-protocol/sdk'
import { Link } from 'react-router'

export interface PubkeyUiCommunityAnchorProps extends TextProps {
  community: PubKeyCommunity
  name?: string
  slug?: string
  to?: string
}

export function PplUiCommunityAnchor({ community, name, slug, to, ...props }: PubkeyUiCommunityAnchorProps) {
  return to?.length ? (
    <Anchor component={Link} to={to} size="xl" fw="bold" {...props}>
      {community.name}
    </Anchor>
  ) : (
    <Text size="xl" fw="bold" {...props}>
      {community.name}
    </Text>
  )
}
