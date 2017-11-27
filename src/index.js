import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'

import 'font-awesome/css/font-awesome.min.css'
import 'simple-line-icons/css/simple-line-icons.css'
import '../scss/style.scss'
import '../scss/core/_dropdown-menu-right.scss'

import store from './redux/store'
import Index from './components/Index'

const Root = () =>
  <Provider store={store}>
    <Index />
  </Provider>

render(<Root />, document.querySelector('react'))
