import axios from 'axios'

import type { AuthToken, UserCredentials, UserProfile } from '@/entities/common'
import type { ResourceResponse } from '@/entities/laravel-conventions'

const http = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
})

export type AuthTokenPayload = {
  grant_type: string
  client_id: string
  client_secret: string
  scope: string
}

export const useAuthentication = () => {
  async function createToken(userCredentials: UserCredentials) {
    const payload: AuthTokenPayload & UserCredentials = {
      grant_type: 'password',
      client_id: '9b1a5107-68b9-4024-aaba-f9871737b04d',
      client_secret: 'aEEB5MDaMlWQ0NmyaBoNMaAKiuoWs8B98lPyKf1X',
      username: userCredentials.username,
      password: userCredentials.password,
      scope: '',
    }

    const response = await http.post<AuthToken>('/oauth/token', payload)
    return response.data
  }

  async function getProfile(token: string) {
    const response = await http.get<ResourceResponse<UserProfile>>(
      '/oauth/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data.data
  }

  return { createToken, getProfile }
}
