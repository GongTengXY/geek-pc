const TOKEN_KEY = 'geek_pc'
const Refresh_KEY = 'geek_refresh'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  return localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  return localStorage.removeItem(TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(Refresh_KEY)
}

export function setRefreshToken(token) {
  return localStorage.setItem(Refresh_KEY, token)
}

export function removeRefreshToken() {
  return localStorage.removeItem(Refresh_KEY)
}
