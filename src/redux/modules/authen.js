// import Rx from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/takeUntil'

import { authenUrl } from '../../configs/api'

// const { Observable } = Rx
const SIGN_IN = 'SIGN_IN'
const SIGN_IN_FULFILLED = 'SIGN_IN_FULFILLED'
const SIGN_IN_CANCELLED = 'SIGN_IN_CANCELLED'

// action creators
export const signIn = (username, password, callback) => ({
  type: SIGN_IN,
  payload: {
    username,
    password,
  },
  callback,
})
export const signInFulfilled = (data, callback) => ({ type: SIGN_IN_FULFILLED, data, callback })
export const signInCancelled = () => ({ type: SIGN_IN_CANCELLED })

export const authenticated = () => {
  const _token = token()
  return _token !== undefined && _token !== null
}

export const signOut = () => {
  sessionStorage.clear()
  window.location.href = '/'
}

export const token = () => sessionStorage.getItem('token')

// epic
// export const signInEpic = () =>
//   Observable.of(1, 2, 3)
//     .flatMap(value => Observable.of(value + 1))
//     .subscribe(value => console.log(value))

export const signInEpic = action$ =>
  action$.ofType(SIGN_IN)
    .mergeMap(action => {
      console.log(action.type)
      // const formData = new FormData()
      // const data = action.payload

      // Object
      //   .keys(data)
      //   .forEach(key => formData.append(key, data[key]))

      return ajax({
        url: authenUrl('/authen'),
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
        .map(({ response }) => signInFulfilled(response, action.callback))
        .do(({ callback }) => callback())
        .takeUntil(action$.ofType(SIGN_IN_CANCELLED))
      // .startWith(loading(true))
    })
// .subscribe(({ callback }) => {
//   console.log('token: ', localStorage.getItem('token'))
//   callback()
// })

const authen = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        signingIn: true,
      }

    case SIGN_IN_FULFILLED:
      sessionStorage.setItem('token', action.data.token)
      console.log('SIGN_IN_FULFILLED: ', action)
      return {
        ...state,
        callback: action.callback,
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
