import { connect } from 'react-redux'
import Component from '../components/Login'
import { signIn, signInCancelled } from '../redux/modules/authen'

const mapStateToProps = ({ authen }) => ({
  authenticated: authen.authenticated,
  signingIn: authen.signingIn,
})

const mapDispatchToProps = dispatch => ({
  signIn: (username, password, callback) => dispatch(signIn(username, password, callback)),
  cancel: () => dispatch(signInCancelled()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component)
