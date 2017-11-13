import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'reactstrap'

import Header from './layouts/Header'
import Sidebar from './layouts/Sidebar'
import Breadcrumb from './layouts/Breadcrumb'
// import Aside from '../components/Aside/'
// import Footer from '../components/Footer/'

import Index from '../containers/Index'
// import { authenticated, signOut } from '../redux/modules/authen'

const Layout = props =>
  <div className="app">
    <Header />
    <div className="app-body">
      <Sidebar {...props} />
      <main className="main">
        <Breadcrumb />
        <Container fluid>
          <Switch>
            <Route path="/dashboard" name="Dashboard" component={Index} />
            <Route path="/url" name="Shorten" component={Index} />
          </Switch>
        </Container>
      </main>
      {/* <Aside /> */}
    </div>
    {/* <Footer /> */}
  </div>

export default Layout
