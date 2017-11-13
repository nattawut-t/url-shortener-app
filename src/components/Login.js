import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap'
import { Icon } from 'react-fa'
import alertMessage from '../shareds/alertMessage'

class Login extends Component {
  state = {
    username: 'appsynth',
    password: 'P@ssw0rd',
  }

  handleChange = (name, value) => this.setState({ [name]: value })

  render() {
    const { username, password } = this.state
    const { signIn, signingIn, cancel, history } = this.props

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup className="mb-0">
                <Card className="p-4">
                  <CardBody>
                    <h1>Sign In</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon><i className="icon-user" /></InputGroupAddon>
                      <Input
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={({ target: { value } }) => this.handleChange('username', value)}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon><i className="icon-lock" /></InputGroupAddon>
                      <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={({ target: { value } }) => this.handleChange('password', value)}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="12">
                        <Button
                          color="primary"
                          className="px-4"
                          disabled={!username || !password || signingIn}
                          onClick={() => {
                            if (signIn) {
                              signIn(username, password, () => {
                                alertMessage('Sign in sucessfully completed', 'info')
                                history.push('/dashboard')
                              })
                            }
                          }}
                        >
                          <Icon spin name={signingIn ? 'circle-o-notch' : ''} size="lg" />&nbsp;&nbsp;Sign In
                        </Button>
                        &nbsp;&nbsp;
                        {signingIn ?
                          <Button
                            className="px-4"
                            onClick={cancel}
                          >
                            Cancel
                          </Button> : ''
                        }
                      </Col>

                      <Col xs="12" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h3>URL Shortener</h3>
                      <h5>demo for</h5>
                      <p>&nbsp;</p>
                      <h1>Appsynth</h1>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withRouter(Login)
