'use client'

import { usePathname, useRouter } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import type { AuthToken, UserProfile } from '@/entities/common'
import { authorize } from '@/providers/route'
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
  const router = useRouter()

  const authAPI = useAuthentication()
  const { token } = useToken()

  const fetchUser = async () => {
    const fetchedUser = token ? await authAPI.getProfile(token) : token
    if (!fetchedUser) {
      throw new Error('No user')
    }

    return fetchedUser
  }

  useEffect(() => {
    fetchUser()
      .then((res) => {
        setUser(res)
        authorize(router, pathname, res)
      })
      .catch(() => {
        authorize(router, pathname, undefined)
      })
  }, [token])

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
