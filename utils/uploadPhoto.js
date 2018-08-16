import { post, get, BASE_URL } from './network.js'
import { token, login } from './auth.js'
import { DirectUpload } from 'activestorage'
import { FileSystem } from 'expo'

export const PHOTOS_DIR = FileSystem.documentDirectory + 'photosToUpload';

export const uploadPhotoAsync = async (filePath) => {
  let data = new FormData()
  return fetch(filePath)
  .then(response => response.blob())
  .then((blob) => data.append('expense[image]', {
    uri: filePath,
    name: blob.data.name,
    type: blob.type,
  }))
  .then(() => fetch(`${BASE_URL}/api/v1/expenses`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    },
    body: data
  }))
}

