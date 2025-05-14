import React, { Suspense } from 'react'
import { Loader } from '@mantine/core'
import { Outlet } from 'react-router'

export default function LayoutApp() {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  )
}
