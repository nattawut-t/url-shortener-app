import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'

import Header from './layouts/Header'
import Sidebar from './layouts/Sidebar'
import Breadcrumb from './layouts/Breadcrumb'
// import Aside from '../components/Aside/'
// import Footer from '../components/Footer/'

// Icons
// import FontAwesome from '../views/Icons/FontAwesome/'
// import SimpleLineIcons from '../views/Icons/SimpleLineIcons/'
import Index from '../containers/Index'
// import Search from '../containers/loans/Search'
// import New from '../containers/loans/New'

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
            {/* <Route path="/loans/new" name="NewLoan" component={New} /> */}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Container>
      </main>
      {/* <Aside /> */}
    </div>
    {/* <Footer /> */}
  </div>

export default Layout
