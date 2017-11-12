import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authen from './authen'
import urlShortener from './urlShortener'

export default combineReducers({
  authen,
  urlShortener,
  form: formReducer,
})
