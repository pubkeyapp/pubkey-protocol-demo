import type { ReactNode } from 'react'
import { type UiConfig, UiContext } from './ui-context'

export function UiContextProvider({ children, config }: { children: ReactNode; config: UiConfig }) {
  return <UiContext.Provider value={{ config }}>{children}</UiContext.Provider>
}
