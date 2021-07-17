import { Provider } from 'next-auth/client'
import React, { useContext } from 'react'
import {
  ThemeSwitchContext,
  ThemeSwitchProvider,
} from '../contexts/ThemeSwitchContext'
import { GlobalStyles } from '../styles/global'
import '../utils/reset.css'

export default function App({ Component, pageProps }) {
  const { toggleTheme } = useContext(ThemeSwitchContext)
  return (
    <ThemeSwitchProvider>
      <Provider session={pageProps.session}>
        <GlobalStyles />
        <Component toggleTheme={toggleTheme} {...pageProps} />
      </Provider>
    </ThemeSwitchProvider>
  )
}
