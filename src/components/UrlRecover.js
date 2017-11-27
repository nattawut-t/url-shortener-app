import { Component } from 'react'

class Url extends Component {
  componentDidMount() {
    const { key } = this.props.match.params
    const { getUrl } = this.props

    if (key && getUrl) {
      getUrl(key)
    }
  }

  render() {
    const { url } = this.props
    if (url) {
      window.location.href = url
    }
    return 'Redirecting ...'
  }
}

export default Url
