'use client'

import type { ComponentType, FC, JSX, PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import type { AuthToken, UserProfile } from '@/entities/common'
import { useAuthentication } from '@/services/auth'

export type AuthContextProps = {
  user?: UserProfile
  isAuthenticated?: boolean
  isLoading?: Boolean
  loginWithRedirect: (next: string) => void
  logout?: () => void
  onRedirect: (next: string) => JSX.Element
}

const loginWithRedirect = (next: string) => {
  if (typeof window !== 'undefined')
    window.location.href = `/login?next=${next}`
}

const onRedirect = (next: string) => {
  if (typeof window !== 'undefined') window.location.href = next

  return <div />
}

const initialContext: AuthContextProps = {
  loginWithRedirect,
  onRedirect,
}

const AuthContext = createContext<AuthContextProps>(initialContext)

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

export type AuthProviderProps = PropsWithChildren & {
  /**
   * Return logged in user
   */
  getUser: () => Promise<UserProfile>,

  /**
   * Logout user
   */
  logout: () => Promise<any>

  /**
   * Login user with redirect
   */
  loginWithRedirect: () => any

  /**
   * Redirect user after logged
   */
  redirectLoggedIn: () => any
}

export const AuthProvider = ({ children, redirectLoggedIn, logout, loginWithRedirect, getUser }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfile>()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    getUser()
        .then((res) => {
          setUser(res)
          setIsAuthenticated(true)
        })
        .catch((e) => {
          setUser(undefined)
          setIsAuthenticated(false)
        })
        .finally(() => {
          setIsLoading(false)
        })
  }, [getUser])

  const context = useMemo(() => {
    return {
      user,
      isLoading,
      isAuthenticated,
      onRedirect,
      loginWithRedirect,
      logout,
    }
  }, [user, isLoading, isAuthenticated])

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export type AuthenticationOptions = {
  /**
   * Define the role can access the component
   */
  roles?: string[]

  /**
   * Define allowed scopes
   */
  scopes?: string[]

  /**
   * Handle when the user is not authenticated
   */
  unauthenticated?: () => JSX.Element
}

const defaultUnauthenticated = () => {
  if (typeof window !== 'undefined') {
    const next = `${window.location.pathname}${window.location.search}`
    window.location.href = `/login?next=${next}`
  }
  return <div />
}

export const withAuthenticationRequired = <P extends object>(
  Component: ComponentType<P>,
  options: AuthenticationOptions = {}
): FC<P> => {
  return function WithAuthenticationRequired(props: P): JSX.Element {
    const { unauthenticated = defaultUnauthenticated } = options
    const { isAuthenticated, isLoading } = useAuthContext()

    if (isLoading) {
      return <div />
    }

    return isAuthenticated ? <Component {...props} /> : unauthenticated()
  }
}

export type WithAuthorizationOptions = {
  /**
   * Handle when the user is not authorized
   */
  unauthorized?: () => JSX.Element

  /**
   * Granted permission for some roles
   */
  forRoles?: string[]

  /**
   * Granted permission for some scopes
   */
  forScopes?: string[]
}

export const withAuthorization = <P extends object>(
  Component: ComponentType<P>,
  options: WithAuthorizationOptions = {}
): FC<P> => {
  return function WithAuthorization(props: P): JSX.Element {
    const { unauthorized = () => <span>Action is not authorized</span> } =
      options
    const { isAuthenticated } = useAuthContext()

    if (isAuthenticated) {
      return unauthorized()
    }

    // Check role and scope here

    return <Component {...props} />
  }
}
