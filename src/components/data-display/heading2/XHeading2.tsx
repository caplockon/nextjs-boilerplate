import clsx from 'clsx'
import type { HTMLAttributes, PropsWithChildren } from 'react'

export type XHeading2Props = HTMLAttributes<HTMLHeadingElement> &
  PropsWithChildren & {}

export const XHeading2 = ({
  children,
  className,
  ...others
}: XHeading2Props) => {
  return (
    <h2
      className={clsx(
        className,
        'text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white'
      )}
      {...others}
    >
      {children}
    </h2>
  )
}
