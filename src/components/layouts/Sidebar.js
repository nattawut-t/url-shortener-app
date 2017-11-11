import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Badge, Nav, NavItem, NavLink as RsNavLink } from 'reactstrap'
import isExternal from 'is-url-external'
import classNames from 'classnames'
import nav from './_nav'
import SidebarFooter from './SidebarFooter'
import SidebarForm from './SidebarForm'
import SidebarHeader from './SidebarHeader'
import SidebarMinimizer from './SidebarMinimizer'

class Sidebar extends Component {
  handleClick(e) {
    e.preventDefault()
    e.target.parentElement.classList.toggle('open')
  }

  activeRoute(routeName, props) {
    // return this.props.location.pathname.indexOf(routeName) > -1
    // ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown'
    return (props.location &&
      props.location.pathname &&
      props.location.pathname.indexOf(routeName) > -1)
      ? 'nav-item nav-dropdown open'
      : 'nav-item nav-dropdown'
  }

  // todo Sidebar nav secondLevel
  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1
  // ? "nav nav-second-level collapse in" : "nav nav-second-level collapse"
  // }

  render() {
    // const props = this.props
    // const activeRoute = this.activeRoute
    // const handleClick = this.handleClick

    // badge addon to NavItem
    const badge = _badge => {
      if (_badge) {
        const classes = classNames(_badge.class)
        return (<Badge className={classes} color={_badge.variant}>{_badge.text}</Badge>)
      }

      return null
    }

    // simple wrapper for nav-title item
    const wrapper = item =>
      (item.wrapper && item.wrapper.element
        ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name))
        : item.name)

    // nav list section title
    const title = (_title, key) => {
      const classes = classNames('nav-title', _title.class)
      return (<li key={key} className={classes}>{wrapper(_title)} </li>)
    }

    // nav list divider
    const divider = key => <li key={key} className="divider" />

    // nav item with nav link
    const navItem = (item, key) => {
      const classes = classNames(item.class)
      const variant = classNames('nav-link', item.variant ? `nav-link-${item.variant}` : '')
      return (
        <NavItem key={key} className={classes}>
          {isExternal(item.url) ?
            <RsNavLink href={item.url} className={variant} active>
              <i className={item.icon} />{item.name}{badge(item.badge)}
            </RsNavLink>
            :
            <NavLink to={item.url} className={variant} activeClassName="active">
              <i className={item.icon} />{item.name}{badge(item.badge)}
            </NavLink>
          }
        </NavItem>
      )
    }

    // nav link
    const navLink = (item, idx) =>
      item.title ? title(item, idx) :
        item.divider ? divider(idx) :
          item.children ? navDropdown(item, idx)
            : navItem(item, idx)

    // nav list
    const navList = items =>
      items.map((item, index) => navLink(item, index))

    // nav dropdown
    const navDropdown = (item, key) =>
      <li key={key} className={this.activeRoute(item.url, this.props)}>
        <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className={item.icon} />{item.name}</a>
        <ul className="nav-dropdown-items">
          {navList(item.children)}
        </ul>
      </li>

    // sidebar-nav root
    return (
      <div className="sidebar">
        <SidebarHeader />
        <SidebarForm />
        <nav className="sidebar-nav">
          <Nav>
            {navList(nav.items)}
          </Nav>
        </nav>
        <SidebarFooter />
        <SidebarMinimizer />
      </div>
    )
  }
}

export default Sidebar
