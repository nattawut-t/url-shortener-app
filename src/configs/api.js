export const authenUrl = process.env.SIGN_IN_URL || ''
export const url = (endpoint = '') => `${authenUrl}${endpoint}`
