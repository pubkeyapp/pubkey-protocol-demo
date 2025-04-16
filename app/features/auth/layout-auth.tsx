import React from 'react'
import { UiFooter } from '~/ui/ui-footer'
import { UiLayout } from '~/ui/ui-layout'

export default function LayoutAuth() {
  return <UiLayout basePath="/" footer={<UiFooter />} />
}
