import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/takeUntil'

import { urlShortenerUrl } from '../../configs/api'
import { token } from './authen'

const apiPath = '/url/shorten'

const SHORTEN_URL = 'SHORTEN_URL'
const SHORTEN_URL_FULFILLED = 'SHORTEN_URL_FULFILLED'
const SHORTEN_URL_CANCELLED = 'SHORTEN_URL_CANCELLED'
const GET_URL = 'GET_URL'
const GET_URL_FULFILLED = 'GET_URL_FULFILLED'

export const shortenUrl = url => ({
  type: SHORTEN_URL,
  payload: url,
})
export const shortenUrlFulfilled = (payload, callback) => ({
  type: SHORTEN_URL_FULFILLED,
  payload,
  callback,
})
export const shortenUrlCancelled = () => ({ type: SHORTEN_URL_CANCELLED })
export const getUrl = key => ({ type: GET_URL, payload: key })
export const getUrlFulfilled = payload => ({ type: GET_URL_FULFILLED, payload })

export const shortenUrlEpic = action$ =>
  action$.ofType(SHORTEN_URL)
    .mergeMap(action =>
      ajax({
        url: urlShortenerUrl(apiPath),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token(),
        },
        body: { url: action.payload },
        crossDomain: true,
        withCredentials: false,
      })
        .delay(1000)
        .map(({ response }) => shortenUrlFulfilled(response))
        .takeUntil(action$.ofType(SHORTEN_URL_CANCELLED))
    )

export const getUrlEpic = action$ =>
  action$.ofType(GET_URL)
    .mergeMap(action =>
      ajax({
        url: urlShortenerUrl(`${apiPath}/${action.payload}`),
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token(),
        },
        crossDomain: true,
        withCredentials: false,
      })
        .map(({ response }) => getUrlFulfilled(response))
    )

const urlShortener = (state = {}, action) => {
  switch (action.type) {
    case SHORTEN_URL:
      return {
        ...state,
        shortening: true,
      }

    case SHORTEN_URL_FULFILLED:
      return {
        ...state,
        callback: action.callback,
        shortUrl: action.payload.url,
        shortening: false,
      }

    case SHORTEN_URL_CANCELLED:
      return {
        ...state,
        shortening: false,
      }

    case GET_URL_FULFILLED:
      return {
        ...state,
        url: action.payload.url,
      }

    default:
      return state
  }
}

export default urlShortener
