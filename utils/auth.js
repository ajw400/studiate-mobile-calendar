import { AuthSession, SecureStore } from 'expo'
import { BASE_URL, post } from './network'

export const APP_ID = 'd937efecfced01a29be08b357002c80e052dad689311cb858598f35ca92afe08'
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
  token = null
  return SecureStore.deleteItemAsync(TOKEN_KEY)
}
