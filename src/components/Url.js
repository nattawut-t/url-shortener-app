import { Component } from 'react'

class Url extends Component {
  componentDidMount() {
    const { key } = this.props.match.params
    const { getUrl } = this.props

    if (key && getUrl) {
      getUrl(key)
    }
    // window.location.href = 'https://stackoverflow.com/questions/39954010/react-redux-with-redux-observable-use-the-router-to-navigate-to-a-different-page'
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
