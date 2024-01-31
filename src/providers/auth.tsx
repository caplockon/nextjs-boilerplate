'use client'

import {
  type ComponentType,
  createContext,
  type FC,
  type JSX,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { LoadingState, useLoadingContext } from '@/components/general'
import type { UserCredentials, UserProfile } from '@/entities/common'
import AuthUnauthenticated from '@/providers/auth/AuthUnauthenticated'
import type { AuthServer } from '@/services/auth'
import { useToken } from '@/services/auth'

export type AuthContextProps = {
  user?: UserProfile
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => Promise<any>
  login: (credentials: UserCredentials) => Promise<UserProfile | any>
}

const initialAuthContext = {
  isLoading: false,
  isAuthenticated: false,
  logout: async () => {},
  login: async () => {},
}

const AuthContext = createContext<AuthContextProps>(initialAuthContext)

export type AuthProviderProps = PropsWithChildren & {
  server: AuthServer
}
export const AuthProvider = ({ children, server }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfile>()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { token, setToken, removeToken } = useToken()

  const unAuthenticate = () => {
    setUser(undefined)
    setIsAuthenticated(false)
  }

  const storeUser = (userObject: UserProfile) => {
    setUser(userObject)
    setIsAuthenticated(true)
  }

  const login = async (credentials: UserCredentials) => {
    setIsLoading(true)
    const response = await server.createToken(credentials)
    setToken(response)
    const loggedUser = await server.getProfile(response.access_token)
    setUser(loggedUser)
    setIsLoading(false)
    return loggedUser
  }

  const logout = async () => {
    setIsLoading(true)
    if (token) {
      await server.destroyToken(token.access_token)
    }
    removeToken()
    setUser(undefined)
    setIsAuthenticated(false)
    setIsLoading(false)
  }

  const fetchUser = async () => {
    setIsLoading(true)
    let loggedInUser
    try {
      if (token) {
        loggedInUser = await server.getProfile(token.access_token)
      }
    } catch (e) {
      /* empty */
    }
    setIsLoading(false)
    return loggedInUser
  }

  useEffect(() => {
    if (isAuthenticated) {
      return
    }

    ;(async () => {
      const loggedInUser = await fetchUser()
      if (loggedInUser) {
        storeUser(loggedInUser)
      } else {
        unAuthenticate()
      }
    })()
  }, [token])

  const context = useMemo(() => {
    return {
      user,
      isLoading,
      isAuthenticated,
      logout,
      login,
    }
  }, [user, isLoading, isAuthenticated])

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export type AuthenticationOptions = {
  /**
   * Handle when the user is not authenticated
   */
  unauthenticated?: () => JSX.Element
}

/**
 * Higher component to check if the component need authentication before accessing
 * @param Component
 * @param options
 */
export const withAuthenticationRequired = <P extends object>(
  Component: ComponentType<P>,
  options: AuthenticationOptions = {}
): FC<P> => {
  return function WithAuthenticationRequired(props: P): JSX.Element {
    const { isAuthenticated, isLoading } =
      useContext<AuthContextProps>(AuthContext)
    const { setIsLoading } = useLoadingContext()

    useEffect(() => {
      setIsLoading(isLoading)
    }, [isLoading, isAuthenticated])

    if (isLoading) {
      return <LoadingState />
    }

    // Setup unauthenticated handle
    const unauthenticatedHandler =
      options.unauthenticated ||
      (() => {
        return <AuthUnauthenticated next="/login" />
      })

    setIsLoading(true)
    return isAuthenticated ? <Component {...props} /> : unauthenticatedHandler()
  }
}

/**
 * Export context to use
 */
export const useAuthContext = () => useContext(AuthContext)
