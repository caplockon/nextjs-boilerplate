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
      client_id: '9b278227-2d37-4700-b1af-db94b0878e8c',
      client_secret: 'GAyUg2J2cm4f0a7T5k1GCFBw0lniju8To1HZwZYy',
      username: userCredentials.username,
      password: userCredentials.password,
      scope: '',
    }

    const response = await http.post<AuthToken>('/oauth/token', payload)
    return response.data
  }

  async function getProfile(token: string) {
    const response = await http.get<ResourceResponse<UserProfile>>(
      '/api/oauth/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data.data
  }

  async function destroyToken(token: string) {
    const response = await http.post<ResourceResponse<any>>(
      '/api/oauth/token/destroy',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data.data
  }

  return { createToken, getProfile, destroyToken }
}

export type AuthClientOptions = {

}

export function AuthClient() {

}
