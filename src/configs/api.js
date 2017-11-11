export const signInUrl = process.env.SIGN_IN_URL || ''
export const url = (endpoint = '') => `${signInUrl}${endpoint}`
