import React, { Component } from 'react'
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavDropdown,
} from 'reactstrap'
import { signOut } from '../../redux/modules/authen'

class HeaderDropdown extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false,
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  dropAccnt() {
    return (
      <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav caret={this.state.caretVisible}>
          <img src="img/avatars/6.jpg" className="img-avatar" alt="appsynth" />
          <span className="d-md-down-none">appsynth</span>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={signOut}><i className="fa fa-lock" /> Logout</DropdownItem>
        </DropdownMenu>
      </NavDropdown>
    )
  }

  render() {
    // const { ...attributes } = this.props
    return (
      this.dropAccnt()
    )
  }
}

export default HeaderDropdown
