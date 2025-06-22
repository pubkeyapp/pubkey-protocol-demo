import { Anchor, Button, Container, Group, Stack, Stepper, Text, Title } from '@mantine/core'
import { appMeta } from '~/lib/app-meta'
import { Link } from 'react-router'
import { HomepageUiHero } from '~/features/homepage/ui/homepage-ui-hero'
import { HomepageUiFeatures } from '~/features/homepage/ui/homepage-ui-features'
import React from 'react'
import { LucideRocket } from 'lucide-react'

export function meta() {
  return appMeta(
    'Discover the social layer on Solana',
    'Create your profile, verify your identities, and connect with communities. Build trust and unlock new possibilities for decentralized applications.',
  )
}

export default function RouteIndex() {
  return (
    <Container size="lg" display="flex" py="xl" style={{ flexDirection: 'column', gap: 64 }}>
      <HomepageUiHero />
      <HomepageUiFeatures />
      <Stack gap="xl" align="center">
        <Title order={2}>How It Works</Title>
        <Stepper orientation="vertical" active={0}>
          <Stepper.Step
            label="Sign Up with Social"
            description="Create your PubKey profile by signing up with your social account."
          />
          <Stepper.Step
            label="Verify Identities"
            description="Link your Solana wallet and other social identities to your PubKey profile."
          />
          <Stepper.Step
            label="Store on Solana"
            description="Create the profile on Solana and store it on the blockchain."
          />
          <Stepper.Step
            label="Connect & Build"
            description="Use your verified profile to engage with apps and communities on Solana."
          />
        </Stepper>
      </Stack>
      <Stack align="center">
        <Title order={2}>Get Started</Title>
        <Text>Ready to join the social layer on Solana? Sign up now and create your PubKey profile.</Text>
        <Text>
          <Anchor component={Link} to="/onboarding">
            Sign Up Now
          </Anchor>
        </Text>

        <Title order={2}>Join Our Community</Title>
        <Text>Have questions? Want to stay updated? Connect with us on Discord or follow @PubKeyApp on X.</Text>
        <Text>
          <Anchor target="_blank" rel="noreferrer noopener" href="https://discord.gg/XxuZQeDPNf">
            Join Discord
          </Anchor>{' '}
          |{' '}
          <Anchor target="_blank" rel="noreferrer noopener" href="https://x.com/pubkeyapp">
            Follow on X
          </Anchor>
        </Text>

        <Title order={2}>Developers</Title>
        <Text>
          Build on PubKey Protocol to create powerful, identity-driven applications. Access verified user data and
          integrate with ease.
        </Text>
        <Text>
          <Anchor target="_blank" rel="noreferrer noopener" href="https://discord.gg/XxuZQeDPNf">
            Join Discord
          </Anchor>{' '}
          |{' '}
          <Anchor target="_blank" rel="noreferrer noopener" href="https://github.com/pubkeyapp/pubkey-protocol">
            Fork on GitHub
          </Anchor>
        </Text>
      </Stack>

      <Group my="xl" justify="center">
        <Button leftSection={<LucideRocket />} component={Link} to="/onboarding" size="xl" variant="filled">
          Get Started
        </Button>
      </Group>
    </Container>
  )
}
