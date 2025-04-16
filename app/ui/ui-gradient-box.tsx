import { Box, type BoxProps } from '@mantine/core'
import type { ReactNode } from 'react'
import { useThemeColor } from '~/ui/use-theme-color'

export function useBackgroundGradient() {
  const bgLeft = useThemeColor(['indigo', 9, 'indigo', 5])
  const bgRight = useThemeColor(['green', 8, 'green', 5])

  return {
    ltr: `linear-gradient(250deg, ${hexToRGBA(bgRight, 0.08)} 0%, ${hexToRGBA(bgLeft, 0.08)} 70%)`,
    rtl: `linear-gradient(250deg, ${hexToRGBA(bgLeft, 0.08)} 0%, ${hexToRGBA(bgRight, 0.08)} 70%)`,
  }
}

export function UiGradientBox({
  children,
  direction,
  ...props
}: BoxProps & { children: ReactNode; direction: 'ltr' | 'rtl' }) {
  const { ltr, rtl } = useBackgroundGradient()
  return (
    <Box style={{ backgroundImage: direction === 'ltr' ? ltr : rtl, overflow: 'auto' }} {...props}>
      {children}
    </Box>
  )
}

export function hexToRGBA(hex: string, alpha: number) {
  const cleanHex = hex.replace('#', '')
  const r = parseInt(cleanHex.substring(0, 2), 16)
  const g = parseInt(cleanHex.substring(2, 4), 16)
  const b = parseInt(cleanHex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
