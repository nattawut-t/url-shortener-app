import React from 'react'
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

const Index = ({ longUrl, shortUrl, shortenUrl, shortening, cancel }) =>
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
                component={({ input }) =>
                  <div>
                    <Input
                      {...input}
                      type="text"
                      id="longUrl"
                      placeholder="Long URL"
                      disabled={shortening}
                    />
                  </div>
                }
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
            color="primary"
            className="px-4"
            disabled={!longUrl || shortening}
            onClick={() => {
              if (shortenUrl) {
                console.log(shortenUrl, longUrl)
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

        <Col xs="12">
          <FormGroup>
            <Input
              name="shortUrl"
              type="text"
              id="shortUrl"
              placeholder="Short URL"
              value={shortUrl ? `${window.location.origin}/${shortUrl}` : ''}
              readOnly
            />
          </FormGroup>
        </Col>

      </CardBody>
    </Card>
  </div >

export default reduxForm({
  form: 'urlShortenerForm',
})(Index)
