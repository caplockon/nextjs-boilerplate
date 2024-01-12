import type { PropsWithChildren } from 'react'

export const XPageHeader = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
      {children}
    </h2>
  )
}
