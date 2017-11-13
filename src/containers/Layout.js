import { connect } from 'react-redux'
import Component from '../components/Layout'

const mapStateToProps = ({ authen }) => ({
  signingIn: authen.signingIn,
})

const mapDispatchToProps = () => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component)
