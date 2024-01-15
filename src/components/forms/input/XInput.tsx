import clsx from 'clsx'
import type { InputHTMLAttributes, Ref } from 'react'
import { forwardRef } from 'react'

type XBaseInputProps = {
  label?: string
  type?: string
  wrapperClass?: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

export const XInput = forwardRef((props: XBaseInputProps, ref: Ref<any>) => {
  const {
    label = null,
    wrapperClass = 'mb-4',
    type = 'text',
    className,
    error,
    ...others
  } = props

  return (
    <div className={wrapperClass}>
      {label && (
        <label
          htmlFor={others.id}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}

      <input
        ref={ref}
        {...others}
        type={type}
        className={clsx(
          'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
          className
        )}
      />
      {error && (
        <div className="ml-1 mt-1 text-xs font-light text-danger">{error}</div>
      )}
    </div>
  )
})

XInput.displayName = 'XInput'
