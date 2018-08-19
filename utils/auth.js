import { AuthSession, SecureStore } from 'expo'
import { BASE_URL, post } from './network'

export const APP_ID = 'cc1fb4ea250190f3f00a631516775fc6705dd4797f2f774dc5db7f9a0f2ed0c4'
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

export const login = async () => {
  let redirectUrl = AuthSession.getRedirectUrl()
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
      console.log("----JSON Response ----", json)
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
