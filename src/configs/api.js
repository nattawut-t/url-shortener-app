export const _authenUrl = process.env.AUTHEN_URL || ''
export const authenUrl = (endpoint = '') => `${_authenUrl}${endpoint}`

export const _urlShortenerUrl = process.env.URL_SHORTENER_URL || ''
export const urlShortenerUrl = (endpoint = '') => `${_urlShortenerUrl}${endpoint}`
