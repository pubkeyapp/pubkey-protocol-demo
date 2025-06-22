import { Badge, Card, Container, Group, SimpleGrid, Text, Title, useMantineTheme } from '@mantine/core'
import classes from './homepage-ui-features.module.css'
import { LucideBox, LucidePersonStanding, LucideUsers } from 'lucide-react'

const features = [
  {
    title: 'Own Your Identity',
    description: 'Create a profile that represents you, verified by communities you trust.',
    icon: LucidePersonStanding,
  },
  {
    title: 'Seamless Integration',
    description: 'Developers can leverage verified identities in their Solana-based apps and programs.',
    icon: LucideBox,
  },
  {
    title: 'Community-Driven',
    description: 'Join a network where communities validate and empower user identities.',
    icon: LucideUsers,
  },
]

export function HomepageUiFeatures() {
  const theme = useMantineTheme()
  const cards = features.map(({ icon: Icon, ...feature }) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <Icon size={50} color={theme.colors.blue[6]} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ))

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          Why PubKey?
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Why PubKey Protocol?
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        PubKey Protocol is the social layer on Solana. Create a profile with verified identities that can be used in
        Solana apps and onchain programs.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {cards}
      </SimpleGrid>
    </Container>
  )
}
