import type { InputHTMLAttributes } from 'react'

type XToggleProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  wrapperClass?: string
}

export const XToggle = (props: XToggleProps) => {
  const { wrapperClass = 'mb-4', label, ...others } = props
  return (
    <div className={wrapperClass}>
      <label
        htmlFor={others.id}
        className="relative inline-flex cursor-pointer items-center"
      >
        <input {...others} type="checkbox" value="" className="peer sr-only" />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
        {label && (
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {label}
          </span>
        )}
      </label>
    </div>
  )
}
