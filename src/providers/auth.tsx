'use client'

import { usePathname } from 'next/navigation'
import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import type { AuthToken, UserProfile } from '@/entities/common'
import { useAuthentication } from '@/services/auth'

export type AuthContextProps = {
  user?: UserProfile
}

const AuthContext = createContext<AuthContextProps>({})

export const useToken = () => {
  const storage = typeof window !== 'undefined' ? sessionStorage : undefined

  const getToken = () => {
    const tokenString = storage?.getItem('token')
    const userToken = tokenString ? JSON.parse(tokenString) : undefined
    return userToken?.access_token
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (userToken: AuthToken) => {
    storage?.setItem('token', JSON.stringify(userToken))
    setToken(userToken.access_token)
  }

  return {
    setToken: saveToken,
    token,
  }
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserProfile>()
  const pathname = usePathname()

  const authAPI = useAuthentication()
  const { token } = useToken()

  useEffect(() => {
    if (token) {
      authAPI.getProfile(token).then((res) => setUser(res))
    }
  }, [])

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export type AuthMiddlewareConfig = {
  /**
   * Handle before checking authorization
   * @param req
   */
  before?: (req: NextRequest) => NextResponse | boolean
  /**
   * Check authentication
   * @param req
   * @param user
   */
  auth?: (
    req: NextRequest,
    user: UserProfile | undefined
  ) => NextResponse | boolean
}

export const createAuthMiddleware = (config?: AuthMiddlewareConfig) => {
  return (req: NextRequest, event: NextFetchEvent, next: NextMiddleware) => {
    // Check if before authentication is set
    const beforeResult = config?.before?.(req)
    if (beforeResult instanceof NextResponse) return beforeResult

    if (beforeResult) {
      // This is public request, so that skip authorizing
      return next(req, event)
    }

    // Check authentication
    const { user } = useAuthContext()
    const authResult = config?.auth?.(req, user)
    if (authResult instanceof NextResponse) return authResult

    if (!authResult) {
      throw new Error('Unauthorized')
    }

    return next(req, event)
  }
}
