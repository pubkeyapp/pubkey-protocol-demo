import { Image } from '@mantine/core'
import { useUi } from './ui-context'

export interface UiLogoProps {
  height?: number
  size?: number
  width?: number
}

export function UiLogo({ height, size = 42, width }: UiLogoProps) {
  const { config } = useUi()

  return <Image src={config.logo} alt="logo" h={height ?? size} w={width ?? size} />
}
