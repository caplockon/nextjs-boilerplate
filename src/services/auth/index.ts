import axios from 'axios'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { useState } from 'react'

import type { AuthToken, UserCredentials, UserProfile } from '@/entities/common'
import type { ResourceResponse } from '@/entities/laravel-conventions'

export type AuthTokenType = AuthToken | undefined

export const useToken = () => {
  function getToken(): AuthTokenType {
    const accessToken = getCookie('access_token')
    const refreshToken = getCookie('refresh_token')
    const expiresIn = getCookie('expires_in')

    if (accessToken && refreshToken && expiresIn) {
      return {
        access_token: accessToken?.toString(),
        refresh_token: refreshToken?.toString(),
        expires_in: <number>(<unknown>expiresIn),
        token_type: 'Bearer',
      }
    }

    return undefined
  }

  const [token, setToken] = useState<AuthTokenType>(getToken())

  function storeToken(authToken: AuthToken) {
    setCookie('access_token', authToken.access_token || '')
    setCookie('refresh_token', authToken.refresh_token || '')
    setCookie('expires_in', authToken.expires_in?.toString() || '')

    setToken(authToken)
  }

  function removeToken() {
    deleteCookie('access_token')
    deleteCookie('refresh_token')
    deleteCookie('expires_in')

    setToken(undefined)
  }

  return {
    setToken: storeToken,
    removeToken,
    token,
  }
}

export type AuthenticationServerOptions = {
  baseUrl: string
  client_id: string
  client_secret: string
}

export type AuthServer = {
  createToken: (credentials: UserCredentials) => Promise<AuthToken>
  getProfile: (token: string) => Promise<UserProfile>
  refreshToken: (token: string) => Promise<AuthToken>
  destroyToken: (token: string) => Promise<any>
}

export const useAuthServer = (
  options: AuthenticationServerOptions
): AuthServer => {
  const http = axios.create({
    baseURL: options.baseUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  /**
   * Create new token
   * @param userCredentials
   */
  const createToken = async (userCredentials: UserCredentials) => {
    const payload = {
      grant_type: 'password',
      client_id: options.client_id,
      client_secret: options.client_secret,
      username: userCredentials.username,
      password: userCredentials.password,
      scope: userCredentials.scope || '',
    }

    const response = await http.post<AuthToken>('/oauth/token', payload)
    return response.data
  }

  /**
   * Refresh tokens
   * @param token
   */
  const refreshToken = async (token: string) => {
    const payload = {
      grant_type: 'refresh_token',
      client_id: options.client_id,
      client_secret: options.client_secret,
      refresh_token: token,
      scope: '',
    }

    const response = await http.post<AuthToken>('/oauth/token', payload)
    return response.data
  }

  /**
   * Get profile
   * @param token
   */
  const getProfile = async (token: string) => {
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

  /**
   *
   * @param token
   */
  const destroyToken = async (token: string) => {
    const response = await http.post<ResourceResponse<UserProfile>>(
      '/api/oauth/token/destroy',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  }

  return { createToken, getProfile, refreshToken, destroyToken }
}
