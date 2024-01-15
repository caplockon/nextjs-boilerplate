import type { PropsWithChildren } from 'react'

export const XTag = (props: PropsWithChildren) => {
  return (
    <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-primary-900 dark:text-primary-300">
      {props.children}
    </span>
  )
}
