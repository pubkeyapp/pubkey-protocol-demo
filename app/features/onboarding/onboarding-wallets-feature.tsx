import { Link } from 'react-router'
import { Anchor, Container, Text } from '@mantine/core'

export default function OnboardingFeature() {
  return (
    <Container>
      <Text size="lg">Onboarding Wallets</Text>
      <Anchor component={Link} to="/onboarding/profile">
        Go to Profile
      </Anchor>
    </Container>
  )
}
