import clsx from 'clsx'
import type { AnchorHTMLAttributes, PropsWithChildren, ReactNode } from 'react'

export type XLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  PropsWithChildren & {
    tooltip?: string | ReactNode
  }

export const XLink = (props: XLinkProps) => {
  const { tooltip, className, children, ...others } = props

  return (
    <a {...others} className={clsx(className, 'relative')}>
      {tooltip && (
        <div
          role="tooltip"
          className="tooltip absolute bottom-full z-10 inline-block text-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition-opacity duration-300 dark:bg-gray-700"
        >
          {tooltip}
          <div className="tooltip-arrow" data-popper-arrow />
        </div>
      )}
      {children}
    </a>
  )
}
