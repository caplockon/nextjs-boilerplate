import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

export const useObjectState = <T>(
  initial: T | (() => T)
): [T, Dispatch<SetStateAction<T>>, (name: string, value: any) => void] => {
  const [state, setState] = useState<T>(initial)
  const setStateProp = (name: string, value: any) => {
    setState((values) => ({ ...values, [name]: value }))
  }

  return [state, setState, setStateProp]
}
