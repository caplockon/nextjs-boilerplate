import type { InputProps, InputRef } from 'antd'
import { Input } from 'antd'
import type { Ref } from 'react'
import React, { forwardRef } from 'react'

type XBaseInputProps = InputProps &
  React.RefAttributes<InputRef> & {
    type?:
      | 'button'
      | 'checkbox'
      | 'color'
      | 'date'
      | 'datetime-local'
      | 'email'
      | 'file'
      | 'hidden'
      | 'image'
      | 'month'
      | 'number'
      | 'password'
      | 'radio'
      | 'range'
      | 'reset'
      | 'search'
      | 'submit'
      | 'tel'
      | 'text'
      | 'time'
      | 'url'
      | 'week'
  }

export const XInput = forwardRef(
  ({ ...props }: XBaseInputProps, ref: Ref<InputRef>) => {
    return <Input ref={ref} {...props} />
  }
)
XInput.displayName = 'XInput'
