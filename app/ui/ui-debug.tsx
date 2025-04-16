import { CodeHighlightTabs, type CodeHighlightTabsProps } from '@mantine/code-highlight'

export function UiDebug({ data, ...props }: Omit<CodeHighlightTabsProps, 'code'> & { data: string | unknown }) {
  return (
    <CodeHighlightTabs
      defaultExpanded={false}
      withExpandButton
      {...props}
      code={[
        {
          fileName: 'debug.json',
          code: typeof data === 'string' ? data : JSON.stringify(data, undefined, 2),
          language: 'json',
        },
      ]}
    />
  )
}
