import React, { Component } from 'react'
// import { Switch, Route } from 'react-router-dom'
import { Container } from 'reactstrap'

import Header from './layouts/Header'
import Sidebar from './layouts/Sidebar'
import Breadcrumb from './layouts/Breadcrumb'
// import Aside from '../layouts/Aside/'
import Footer from './layouts/Footer'

import { authenticated, signOut } from '../redux/modules/authen'

class Layout extends Component {
  componentDidMount() {
    console.log('componentDidMount')
    const { signingIn } = this.props
    if (!signingIn && !authenticated()) {
      signOut()
    }
  }

  render() {
    const { signingIn, children } = this.props

    if (signingIn || !authenticated()) {
      return ''
    }

    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              {children}
            </Container>
          </main>
          {/* <Aside /> */}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Layout
