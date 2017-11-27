import { connect } from 'react-redux'
import Component from '../components/UrlShortener'
import { shortenUrl, shortenUrlCancelled } from '../redux/modules/urlShortener'

const mapStateToProps = ({ form: { urlShortenerForm }, urlShortener }) => ({
  longUrl: (urlShortenerForm && urlShortenerForm.values && urlShortenerForm.values.longUrl) || '',
  shortUrl: urlShortener.shortUrl,
  shortening: urlShortener.shortening,
})

const mapDispatchToProps = dispatch => ({
  shortenUrl: url => dispatch(shortenUrl(url)),
  cancel: () => dispatch(shortenUrlCancelled()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component)
