import { Provider } from 'react-redux'
import { store } from './store'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import { HomePage } from './pages/home'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <HomePage />
      </ThemeProvider>
    </Provider>
  )
}

export default App
