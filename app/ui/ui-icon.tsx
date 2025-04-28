import spriteHref from './icons/sprite.svg'
import type { SVGProps } from 'react'
import { type IconName, iconNames } from './icons/types'
import type { MantineSize } from '@mantine/core'
import { LucideMessageCircleQuestion } from 'lucide-react'

export function UiIcon({
  name,
  size = 'md',
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName
  size?: MantineSize
}) {
  const sizePx = getSize(size)
  console.log(sizePx)
  if (!iconNames.includes(name)) {
    console.log(`Icon ${name} not found`)
    return <LucideMessageCircleQuestion size={sizePx} />
  }
  return (
    <svg {...props} width={sizePx} height={sizePx}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  )
}

function getSize(size: MantineSize): number {
  switch (size) {
    case 'xs':
      return 16
    case 'sm':
      return 20
    case 'md':
      return 24
    case 'lg':
      return 32
    case 'xl':
      return 40
    default:
      return 24
  }
}
