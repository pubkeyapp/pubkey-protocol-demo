import { Box, Text } from '@mantine/core'
import React from 'react'

export function UiFooter() {
  return (
    <Box component="footer" ta="center" p="xs">
      <Text size="xs" c="dimmed">
        &copy; 2025 PubKey
      </Text>
    </Box>
  )
}
