'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import type { AnchorHTMLAttributes, PropsWithChildren, ReactNode } from 'react'

export type XLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  PropsWithChildren & {
    tooltip?: string | ReactNode
    link?: string
  }

export const XLink = (props: XLinkProps) => {
  const { tooltip, className, onClick, children, link, ...others } = props
  const router = useRouter()
  const handleClick = link ? () => router.push(link) : onClick
  return (
    <a
      {...others}
      onClick={handleClick}
      className={clsx(className, 'relative cursor-pointer')}
    >
      {tooltip && (
        <div
          role="tooltip"
          className="tooltip absolute bottom-full z-10 inline-block text-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition-opacity duration-300 dark:bg-gray-700"
        >
          {tooltip}
          <div className="tooltip-arrow" data-popper-arrow="" />
        </div>
      )}
      {children}
    </a>
  )
}
