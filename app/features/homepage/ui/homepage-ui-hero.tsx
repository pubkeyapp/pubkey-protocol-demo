import { Button, Container, Grid, Group, Image, Stack, Text, Title } from '@mantine/core'
import classes from './homepage-ui-hero.module.css'
import { LucideCloudLightning, LucideLayoutDashboard, LucideRocket, LucideStar } from 'lucide-react'
import { UiIcon } from '~/ui/ui-icon'
import { Link } from 'react-router'

export function HomepageUiHero() {
  const features = [
    { icon: <LucideCloudLightning />, label: 'Lightning Fast' },
    { icon: <LucideStar />, label: 'Production Ready' },
    { icon: <LucideLayoutDashboard />, label: 'Modern Design' },
  ]

  return (
    <Container size="xl" pt="xl">
      <Grid align="center">
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Stack gap="xl">
            {/*<Group gap={'xs'}>*/}
            {/*  <ThemeIcon size="lg" radius="md" variant="transparent">*/}
            {/*    <LucideRocket style={{ width: 20, height: 20 }} color="var(--mantine-primary-color-filled)" />*/}
            {/*  </ThemeIcon>*/}
            {/*  <Text fw={500} size="sm" style={{ letterSpacing: 1 }} tt="uppercase">*/}
            {/*    Create Your Profile Today*/}
            {/*  </Text>*/}
            {/*</Group>*/}

            <Title className={classes?.title} order={1} size="h1">
              Discover the social layer on Solana.
            </Title>

            <Text size="xl" c="dimmed" maw={600}>
              Create your profile, verify your identities, and connect with communities. Build trust and unlock new
              possibilities for decentralized applications.
            </Text>

            <Group mt="xl">
              <Button component={Link} to="/login" size="lg" leftSection={<LucideRocket />}>
                Get Started
              </Button>
              <Button
                component="a"
                href="https://github.com/pubkeyapp/pubkey-protocol"
                target="_blank"
                rel="noreferrer noopener"
                size="lg"
                variant="default"
                leftSection={<UiIcon name="Github" />}
              >
                View on GitHub
              </Button>
            </Group>

            {/*<Group mt={30} gap="xl">*/}
            {/*  {features.map((feature, index) => (*/}
            {/*    <Group key={index} gap="xs">*/}
            {/*      <ThemeIcon*/}
            {/*        size="md"*/}
            {/*        variant="light"*/}
            {/*        color="blue"*/}
            {/*        style={{ background: rgba('var(--mantine-primary-color-filled)', 0.07) }}*/}
            {/*      >*/}
            {/*        {feature.icon}*/}
            {/*      </ThemeIcon>*/}
            {/*      <Text size="sm" c="dimmed">*/}
            {/*        {feature.label}*/}
            {/*      </Text>*/}
            {/*    </Group>*/}
            {/*  ))}*/}
            {/*</Group>*/}
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 5 }} display="flex" style={{ justifyContent: 'center' }}>
          <Image
            w={{ base: '75%', md: '100%' }}
            mt={{ base: 'xl', md: 0 }}
            pt={{ base: 'xl', md: 0 }}
            src="/user-profiles.svg"
          />
        </Grid.Col>
      </Grid>
    </Container>
  )
}
