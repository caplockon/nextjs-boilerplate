import clsx from 'clsx'
import type { HTMLAttributes, PropsWithChildren } from 'react'

export type XCardProps = PropsWithChildren & HTMLAttributes<HTMLDivElement> & {}

export const XCard = (props: XCardProps) => {
  const { children, className } = props
  return (
    <div
      className={clsx(
        className,
        'rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'
      )}
    >
      {children}
    </div>
  )
}
