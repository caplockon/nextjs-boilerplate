import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import type { ObjectShape } from 'yup'
import * as yup from 'yup'

import type { KeysOf } from '@/entities/common'

export const useContextState = <T = object>(
  initial: T | (() => T)
): [T, Dispatch<SetStateAction<T>>, (name: string, value: any) => void] => {
  const [state, setState] = useState<T>(initial)
  const setStateProp = (name: string, value: any) => {
    setState((values) => ({ ...values, [name]: value }))
  }

  return [state, setState, setStateProp]
}

export const defineSchema = <T>(
  schema: (rule: typeof yup) => KeysOf<T> & ObjectShape
) => {
  return yup.object().shape(schema(yup))
}
