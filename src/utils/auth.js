import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
const authorKey = 'authorStatus'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAuthor() {
  return Cookies.get(authorKey)
}

export function setAuthor(author) {
  return Cookies.set(authorKey, author)
}

export function removeAuthor() {
  return Cookies.remove(authorKey)
}