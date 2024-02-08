import axios from 'axios'
import { getCookie } from 'cookies-next'

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POS_API_URL,
  method: 'get',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
})

http.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('access_token')
    if (accessToken) {
      config.headers.setAuthorization(`Bearer ${accessToken}`)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
