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
  // Label,
  Input,
} from 'reactstrap'
import { Icon } from 'react-fa'
import CKEditor from 'react-ckeditor-component'

// const url = path => `${window.location.origin}/#/url/recover/${path}`
const required = value => (value ? undefined : 'Required')
const renderText = ({
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

const renderTextEditor = ({
  input,
  label,
  // type,
  meta: { touched, error, warning },
  handleBlur,
  handleAfterPaste,
  handleChange,
  // content,
}) => {
  console.log('input', input)
  console.log('meta', touched, error, warning)
  console.log(handleBlur, handleAfterPaste, handleChange)

  return (
    <div>
      <CKEditor
        {...input}
        placeholder={label}
        activeClass="p10"
        events={{
          blur: handleBlur,
          afterPaste: handleAfterPaste,
          change: handleChange,
        }}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  )
}

class Email extends Component {
  state = { content: '' }

  handleBlur = e => {
    console.log('onBlur event called with event info: ', e)
  }

  handleChange = e => {
    console.log('onChange fired with event info: ', e)
    const newContent = e.editor.getData()
    this.setState({
      content: newContent,
    })
  }

  updateContent = content => {
    this.setState({
      content,
    })
  }

  handleAfterPaste(evt) {
    console.log('afterPaste event called with event info: ', evt)
  }

  render() {
    const { recipient, shortenUrl, shortening, cancel } = this.props

    return (
      <div className="animated fadeIn">

        {this.state.content}

        <Card>
          <CardHeader>
            <strong>Email</strong>
            <small> new message</small>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Field
                    name="recipient"
                    component={renderText}
                    validate={[required]}
                    label="To"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Field
                    name="subject"
                    component={renderText}
                    validate={[required]}
                    label="Subject"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  {/* <CKEditor
                    activeClass="p10"
                    content={this.state.content}
                    events={{
                      blur: this.onBlur,
                      afterPaste: this.afterPaste,
                      change: this.onChange,
                    }}
                  /> */}
                  <Field
                    name="content"
                    component={(input, label, type, meta) => {
                      const { handleBlur, handleAfterPaste, handleChange } = this
                      console.log(handleBlur, handleAfterPaste, handleChange)

                      return renderTextEditor(input, label, type, meta,
                        handleBlur,
                        handleAfterPaste,
                        handleChange,
                      )
                    }}
                    validate={[required]}
                    label="Subject"
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
                disabled={!recipient || shortening}
                onClick={() => {
                  if (shortenUrl) {
                    shortenUrl(recipient)
                  }
                }}
              >
                <Icon spin name={shortening ? 'circle-o-notch' : ''} size="lg" />&nbsp;&nbsp;Send
              </Button>

            </div>
          </CardBody>
        </Card>
      </div >
    )
  }
}

export default reduxForm({
  form: 'emailForm',
})(Email)
