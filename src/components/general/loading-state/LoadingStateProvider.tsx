'use client'

import { createContext, useContext, useMemo, useState } from 'react'

import { IconSpinner } from '@/components/icons'

export type LoadingContextProps = {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const LoadingContext = createContext<LoadingContextProps>({
  isLoading: true,
  setIsLoading: () => {},
})

export const useLoadingContext = () => useContext(LoadingContext)

export const LoadingState = () => {
  const { isLoading } = useLoadingContext()
  return (
    isLoading && (
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white opacity-80">
        <IconSpinner className="animate-spin" size={40} />
      </div>
    )
  )
}
export const LoadingStateProvider = () => {
  const [isLoading, setIsLoading] = useState(false)

  const data = useMemo(() => {
    return { isLoading, setIsLoading }
  }, [isLoading, setIsLoading])

  return (
    <LoadingContext.Provider value={data}>
      <LoadingState />
    </LoadingContext.Provider>
  )
}
