import clsx from 'clsx'
import type { HTMLAttributes, PropsWithChildren } from 'react'

import { IconSpinner } from '@/components/icons'

export type XBoxProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    isLoading?: boolean
  }

export const XBoxLoading = () => {
  return (
    <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-white opacity-80">
      <IconSpinner className="animate-spin" size={20} />
    </div>
  )
}

export const XBox = ({ children, ...others }: XBoxProps) => {
  const { isLoading = false, className } = others
  return (
    <div className={clsx('relative', className)}>
      {children}
      {isLoading && <XBoxLoading />}
    </div>
  )
}
