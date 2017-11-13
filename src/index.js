import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Alert from 'react-s-alert'

import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'

import 'font-awesome/css/font-awesome.min.css'
import 'simple-line-icons/css/simple-line-icons.css'
import '../scss/style.scss'
import '../scss/core/_dropdown-menu-right.scss'

import store from './redux/store'
import NotFound from './components/errors/NotFound'
import InternalServerError from './components/errors/InternalServerError'
import Url from './containers/Url'
import Login from './containers/Login'
import Layout from './containers/Layout'

const Root = () =>
  <Provider store={store}>
    <div>
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login" component={Login} />
          <Route exact path="/dashboard" name="Layout" component={Layout} />
          <Route path="/:key" name="Recovery" component={Url} />
          <Route exact path="/404" name="NotFound" component={NotFound} />
          <Route exact path="/500" name="InternalServerError" component={InternalServerError} />
          <Redirect from="/" to="/login" />
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
      <Alert stack={{ limit: 3 }} />
    </div>
  </Provider>

render(<Root />, document.querySelector('react'))
