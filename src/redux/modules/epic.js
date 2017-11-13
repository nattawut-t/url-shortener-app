import { combineEpics } from 'redux-observable'
import { signInEpic } from './authen'
import { shortenUrlEpic, getUrlEpic } from './urlShortener'

export default combineEpics(
  signInEpic,
  shortenUrlEpic,
  getUrlEpic,
)
