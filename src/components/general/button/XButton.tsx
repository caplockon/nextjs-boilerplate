import type { ButtonProps } from '@mui/base'
import { Button as BaseButton } from '@mui/base'
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import type { XButtonComposingProps } from '@/components/general/button/XButtonComposing'
import { composeButtonClass } from '@/components/general/button/XButtonComposing'

export type XButtonProps = ButtonProps & XButtonComposingProps

export const XButton = forwardRef<HTMLButtonElement, XButtonProps>(
  (props, ref) => {
    const { className, ...other } = props
    const { sizeClass, variantClass, defaultClass } = composeButtonClass(props)
    return (
      <BaseButton
        ref={ref}
        className={clsx(defaultClass, sizeClass, variantClass, className)}
        {...other}
      />
    )
  }
)

XButton.displayName = 'XButton'
