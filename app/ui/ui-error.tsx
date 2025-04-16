import { Alert, type AlertProps, Text } from '@mantine/core'

export function UiError({ error, ...props }: AlertProps & { error?: Error | null }) {
  if (!error) {
    return null
  }
  return (
    <Alert color="red" title="An error occurred" variant="outline" {...props}>
      <Text>{error?.message ? error.message : `${error}`}</Text>
    </Alert>
  )
}
