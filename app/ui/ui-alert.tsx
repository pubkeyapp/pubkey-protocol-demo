import { Alert, type AlertProps } from '@mantine/core'
import type { ReactNode } from 'react'
import { LucideCircleAlert, LucideCircleCheck, LucideCircleX, LucideMessageCircle } from 'lucide-react'

export interface UiAlertProps extends AlertProps {
  message: ReactNode
  title?: ReactNode
}

export function UiAlert({ message, ...props }: UiAlertProps) {
  return (
    <Alert title={props.title ?? 'Alert'} {...props}>
      {message}
    </Alert>
  )
}

export function UiError({ ...props }: UiAlertProps) {
  return <UiAlert title={props.title ?? 'Error'} color="red" icon={props.icon ?? <LucideCircleX />} {...props} />
}

export function UiInfo({ ...props }: UiAlertProps) {
  return <UiAlert title={props.title ?? 'Info'} color="blue" icon={props.icon ?? <LucideMessageCircle />} {...props} />
}

export function UiSuccess({ ...props }: UiAlertProps) {
  return (
    <UiAlert title={props.title ?? 'Success'} color="green" icon={props.icon ?? <LucideCircleCheck />} {...props} />
  )
}

export function UiWarning({ ...props }: UiAlertProps) {
  return (
    <UiAlert title={props.title ?? 'Warning'} color="yellow" icon={props.icon ?? <LucideCircleAlert />} {...props} />
  )
}
