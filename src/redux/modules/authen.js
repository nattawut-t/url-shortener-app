import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/takeUntil'

import { url } from '../../configs/api'

const SIGN_IN = 'SIGN_IN'
const SIGN_IN_FULFILLED = 'SIGN_IN_FULFILLED'
const SIGN_IN_CANCELLED = 'SIGN_IN_CANCELLED'

// action creators
export const signIn = (username, password) => ({
  type: SIGN_IN,
  payload: {
    username,
    password,
  },
})
export const signInFulfilled = data => ({ type: SIGN_IN_FULFILLED, data })
export const signInCancelled = () => ({ type: SIGN_IN_CANCELLED })

// epic
export const signInEpic = action$ =>
  action$.ofType(SIGN_IN)
    .switchMap(action => {
      console.log(action.type)
      // const formData = new FormData()
      // const data = action.payload

      // Object
      //   .keys(data)
      //   .forEach(key => formData.append(key, data[key]))

      return ajax({
        url: url('/authen'),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        // body: formData,
        body: action.payload,
        crossDomain: true,
        withCredentials: false,
      })
        .delay(1000)
        .map(({ response }) => signInFulfilled(response))
        .takeUntil(action$.ofType(SIGN_IN_CANCELLED))
      // .startWith(loading(true))
    })

const authen = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        signingIn: true,
      }

    case SIGN_IN_FULFILLED:
      localStorage.setItem('token', action.data.token)
      // console.log('token: ', localStorage.getItem('token'))
      return {
        ...state,
        authenticated: () => {
          const token = localStorage.getItem('token')
          return (token !== null) && (token !== undefined)
        },
        signingIn: false,
      }

    case SIGN_IN_CANCELLED:
      return {
        ...state,
        signingIn: false,
      }

    default:
      return state
  }
}

export default authen
