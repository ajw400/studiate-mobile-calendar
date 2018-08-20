import { AuthSession, SecureStore } from 'expo'
import { BASE_URL, post } from './network'

export const APP_ID = '19dd5f59c9e596814299a077997186e2da8a643521ac7d416ca85a59ea57237b'
const TOKEN_KEY = 'token1'
export var token

export const isLoggedIn = () => {
  return new Promise((resolve, reject) => {
    SecureStore.getItemAsync(TOKEN_KEY)
      .then(res => {
        if (res !== null){
          token = res
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(err => reject(err))
  })
}

export const changeToken = (newVal) => {
  token = newVal
}

export const login = async () => {
  let redirectUrl = AuthSession.getRedirectUrl()
  console.log(redirectUrl)
  let result = await AuthSession.startAsync({
    authUrl:
      `${BASE_URL}/oauth/authorize?response_type=code` +
      `&client_id=${APP_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUrl)}`
  })


  return new Promise((resolve, reject) => {
    post("/oauth/token", {
      grant_type: "authorization_code",
      code: result.params.code,
      client_id: APP_ID,
      redirect_uri: redirectUrl,
    })
    .then(json => {
      if (json.access_token) {
        SecureStore.setItemAsync(TOKEN_KEY, json.access_token)
        token = json.access_token
        resolve(true)
      } else {
        reject(json.error)
      }

    })
    .catch(err => reject(err))
  })
}

export const logout = () => {
  token = null
  return SecureStore.deleteItemAsync(TOKEN_KEY)
}
