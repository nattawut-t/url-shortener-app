import { connect } from 'react-redux'
import Component from '../components/Index'

const mapStateToProps = ({ form: { urlShortener } }) => {
  console.log('form: ', urlShortener)

  return {
    longUrl: (urlShortener && urlShortener.values && urlShortener.values.longUrl) || '',
    shortUrl: 'xxx',
  }
}

const mapDispatchToProps = () => ({
  shorten: () => console.log('submit'),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component)
