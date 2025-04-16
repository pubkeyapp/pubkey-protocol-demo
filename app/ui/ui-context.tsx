import { createContext, useContext } from 'react'

export interface UiConfig {
  logo?: string
  name: string
}

export interface UiContextValue {
  config: UiConfig
}

export const UiContext = createContext<UiContextValue>({} as UiContextValue)

export function useUi() {
  return useContext(UiContext)
}
