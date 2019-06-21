/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

// global webpack state
import 'babel-polyfill'

// app-wide components
import ReactOnRails from 'react-on-rails'
import Root from '../containers/Root'  // shouldnt need a pack file for this if import the 'application' pack

ReactOnRails.register({
  Root
})

import store from '../store.js'

ReactOnRails.registerStore({
  store,
})

// register CSRF headers with axios
import axios from 'axios'
axios.defaults.headers.common['X-CSRF-Token'] = ReactOnRails.authenticityToken()
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// add interceptors to pick up and send auth credentials from localStorage
// - devise-token-auth puts them there and updates them on every request for us
// - https://github.com/axios/axios/issues/1383
//   - more in-depth: https://stackoverflow.com/questions/48105729/devise-token-auth-how-to-access-response-header-info-using-javascript
axios.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('access-token')
    if (accessToken) {
      config.headers[config.method] = {
        'access-token': accessToken,
        'client': localStorage.getItem('client'),
        'uid': localStorage.getItem('uid'),
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  },
)
