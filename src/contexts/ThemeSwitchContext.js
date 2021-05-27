import { createContext } from 'react'
import { ThemeProvider } from 'styled-components'
import light from '../styles/themes/light'
import dark from '../styles/themes/dark'
import usePersistedState from '../utils/usePersistedState'

export const ThemeSwitchContext = createContext({})

export function ThemeSwitchProvider({ children }) {
  const [theme, setTheme] = usePersistedState('theme', {title:'light'})

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? {title:'dark'} : {title:'light'})
  }

  return (
    <ThemeSwitchContext.Provider
      value={toggleTheme}
    >
      <ThemeProvider theme={theme.title === 'light' ? light : dark}>{children}</ThemeProvider>
    </ThemeSwitchContext.Provider>
  )
}