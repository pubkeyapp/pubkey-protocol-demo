import { Link } from 'react-router'
import { Anchor, Container, Text } from '@mantine/core'

export default function OnboardingFeature() {
  return (
    <Container>
      <Text size="lg">Onboarding Done</Text>
      <Anchor component={Link} to="/onboarding">
        Go to Dashboard
      </Anchor>
    </Container>
  )
}
