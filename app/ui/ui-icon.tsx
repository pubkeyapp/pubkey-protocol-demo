import spriteHref from './icons/sprite.svg'
import type { SVGProps } from 'react'
import type { IconName } from './icons/types'

export function UiIcon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName
}) {
  return (
    <svg {...props}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  )
}
