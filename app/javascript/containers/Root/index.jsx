import React from 'react'
import ReactOnRails from 'react-on-rails'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import App from 'containers/App'
import {verifyCredentials} from '../../actions'
import {MuiThemeProvider,createMuiTheme} from 'material-ui/styles'

const colorFor = (hue, contrastColor) => {
  return {
    50: hue,
    100: hue,
    200: hue,
    300: hue,
    400: hue,
    500: hue,
    600: hue,
    700: hue,
    800: hue,
    900: hue,
    A100: hue,
    A200: hue,
    A300: hue,
    A400: hue,
    A700: hue,
    contrastDefaultColor: contrastColor,
  }
}

const Root = (props) => {
  const store = ReactOnRails.getStore('store')
  // check if stored access-token session is still valid
  verifyCredentials(store)

  // theme it out
  const theme = createMuiTheme({
    palette: {
      primary: colorFor('#f36262', 'light'),
      secondary: colorFor('#faf2ad', 'dark'),
      accent: colorFor('#eee', 'dark'),
    },
  })

  return (
    <Provider
      store={store}
    >
      <Router>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </Router>
    </Provider>
  )
}

export default Root
