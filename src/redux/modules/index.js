import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authen, { signInEpic } from './authen'

export const rootEpic = combineEpics(
  signInEpic,
)

export const rootReducer = combineReducers({
  authen,
  form: formReducer,
})
