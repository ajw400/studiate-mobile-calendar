import { AuthSession, SecureStore } from 'expo'
import { BASE_URL, post } from './network'

export const APP_ID = '14f33674d4d01a60813b91a4a9ebd2f1bb74438de335c44671e410c530bdde78'
const TOKEN_KEY = 'token'
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
      console.log("----JSON ----", json)
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
  SecureStore.deleteItemAsync(TOKEN_KEY)
  token = null
}
