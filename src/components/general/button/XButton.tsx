import type { ButtonProps } from '@mui/base'
import { Button as BaseButton } from '@mui/base'
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import type { XButtonComposingProps } from '@/components/general/button/XButtonComposing'
import { composeButtonClass } from '@/components/general/button/XButtonComposing'
import { IconSpinner } from '@/components/icons'

export type XButtonProps = ButtonProps &
  XButtonComposingProps & {
    isLoading?: boolean
  }

export const XButton = forwardRef<HTMLButtonElement, XButtonProps>(
  (props, ref) => {
    const { className, isLoading = false, ...other } = props
    const { sizeClass, variantClass, defaultClass } = composeButtonClass(props)
    return (
      <BaseButton
        ref={ref}
        className={clsx(defaultClass, sizeClass, variantClass, className, {
          'flex items-center': isLoading,
        })}
        {...other}
      >
        {isLoading && <IconSpinner className="mr-2 animate-spin" />}
        {props.children}
      </BaseButton>
    )
  }
)

XButton.displayName = 'XButton'
