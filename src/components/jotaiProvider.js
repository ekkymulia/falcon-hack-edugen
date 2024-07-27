'use client'

import { Provider } from 'jotai'

export const JotaiProviders = ({ children }) => {
  return (
    <Provider>
      {children}
    </Provider>
  )
}