import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import 'font-awesome/css/font-awesome.min.css'
import 'simple-line-icons/css/simple-line-icons.css'
import '../scss/style.scss'
import '../scss/core/_dropdown-menu-right.scss'

import store from './redux/store'
import NotFound from './components/errors/NotFound'
import InternalServerError from './components/errors/InternalServerError'
import Login from './containers/Login'
import Layout from './containers/Layout'

const Root = () =>
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/login" name="Login" component={Login} />
        <Route exact path="/dashboard" name="Layout" component={Layout} />
        <Route exact path="/404" name="NotFound" component={NotFound} />
        <Route exact path="/500" name="InternalServerError" component={InternalServerError} />
        <Redirect from="/" to="/login" />
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  </Provider>

render(<Root />, document.querySelector('react'))
