import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/takeUntil'

import { urlShortenerUrl } from '../../configs/api'

const apiPath = '/url/shorten'
const SHORTEN_URL = 'SHORTEN_URL'
const SHORTEN_URL_FULFILLED = 'SHORTEN_URL_FULFILLED'
const SHORTEN_URL_CANCELLED = 'SHORTEN_URL_CANCELLED'

export const shortenUrl = url => {
  console.log('shortenUrl: ', url)
  return {
    type: SHORTEN_URL,
    payload: url,
  }
}
export const shortenUrlFulfilled = (payload, callback) => ({
  type: SHORTEN_URL_FULFILLED,
  payload,
  callback,
})
export const shortenUrlCancelled = () => ({ type: SHORTEN_URL_CANCELLED })

// epic
export const shortenUrlEpic = action$ => {
  console.log('shortenUrlEpic')

  return action$.ofType(SHORTEN_URL)
    .mergeMap(action => {
      console.log('shortenUrlEpic', action.type)

      return ajax({
        url: urlShortenerUrl(apiPath),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { url: action.payload },
        crossDomain: true,
        withCredentials: false,
      })
        .delay(1000)
        .map(({ response }) => shortenUrlFulfilled(response))
        .takeUntil(action$.ofType(SHORTEN_URL_CANCELLED))
      // .startWith(loading(true))
    })
}

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

    default:
      return state
  }
}

export default urlShortener
