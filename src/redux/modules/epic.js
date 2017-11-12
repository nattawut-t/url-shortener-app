import { combineEpics } from 'redux-observable'
import { signInEpic } from './authen'
import { shortenUrlEpic } from './urlShortener'

export default combineEpics(
  signInEpic,
  shortenUrlEpic,
)
