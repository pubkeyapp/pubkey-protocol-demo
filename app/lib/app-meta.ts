export function appMeta(title?: string, description?: string) {
  return [
    { title: `${title ? title + ' | ' : ''}PubKey` },
    {
      name: 'description',
      content: description ? description : 'Default PubKey description',
    },
  ]
}
