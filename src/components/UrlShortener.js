import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import { Icon } from 'react-fa'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const url = path => `${window.location.origin}/#/url/recover/${path}`
const required = value => (value ? undefined : 'Required')
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) =>
  <div>
    <Input
      {...input}
      type={type}
      placeholder={label}
      required
    />
    {touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>

class Index extends Component {
  state = { copied: false }

  render() {
    const { longUrl, shortUrl, shortenUrl, shortening, cancel } = this.props

    return (
      <div className="animated fadeIn">

        <Card>
          <CardHeader>
            <strong>URL Shortener</strong>
            <small> enter a long URL to be shorten</small>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="longUrl">Long URL</Label>
                  <Field
                    name="longUrl"
                    component={renderField}
                    validate={[required]}
                    label="Long URL"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="form-actions" style={{ textAlign: 'right' }}>

              {shortening ?
                <Button
                  className="px-4"
                  onClick={cancel}
                >
                  Cancel
                </Button> : ''
              }
              &nbsp;&nbsp;
              <Button
                name="submit"
                color="primary"
                className="px-4"
                disabled={!longUrl || shortening}
                onClick={() => {
                  if (shortenUrl) {
                    shortenUrl(longUrl)
                  }
                }}
              >
                <Icon spin name={shortening ? 'circle-o-notch' : ''} size="lg" />&nbsp;&nbsp;Shorten URL
              </Button>

            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <strong>Short URL</strong>
            <small> enter your site with the generated-shorter URL</small>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Input
                    name="shortUrl"
                    type="text"
                    id="shortUrl"
                    placeholder="Short URL"
                    value={shortUrl ? url(shortUrl) : ''}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="form-actions" style={{ textAlign: 'right' }}>
              <CopyToClipboard
                text={shortUrl ? url(shortUrl) : ''}
                onCopy={() => this.setState({ copied: true })}
              >
                <Button
                  name="copy"
                  color="primary"
                  className="px-4"
                  disabled={!shortUrl}
                >
                  Copy to Clipboard
                </Button>
              </CopyToClipboard>
              &nbsp;&nbsp;
              <Button
                name="test"
                color="primary"
                className="px-4"
                disabled={!shortUrl}
                onClick={() => {
                  window.open(url(shortUrl), '_blank')
                }}
              >
                Test
              </Button>
            </div>
          </CardBody>
        </Card>
      </div >
    )
  }
}

export default reduxForm({
  form: 'urlShortenerForm',
})(Index)
