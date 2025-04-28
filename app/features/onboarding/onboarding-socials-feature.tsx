import { Link } from 'react-router'
import { Anchor, Container, Text } from '@mantine/core'

export default function OnboardingSocialsFeature() {
  return (
    <Container>
      <Text size="lg">Onboarding Socials</Text>
      <Anchor component={Link} to="/onboarding/wallets">
        Go to Wallets
      </Anchor>
    </Container>
  )
}
