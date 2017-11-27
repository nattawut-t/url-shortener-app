import { connect } from 'react-redux'
import Component from '../components/UrlRecover'
import { getUrl } from '../redux/modules/urlShortener'

const mapStateToProps = ({ urlShortener }) => ({
  url: urlShortener.url,
})

const mapDispatchToProps = dispatch => ({
  getUrl: key => dispatch(getUrl(key)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component)
