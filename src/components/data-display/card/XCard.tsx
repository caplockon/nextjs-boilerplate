import clsx from 'clsx'

import type { XBoxProps } from '@/components/data-display'
import { XBox } from '@/components/data-display'

export type XCardProps = XBoxProps & {}

export const XCard = (props: XCardProps) => {
  const { children, className, ...others } = props
  return (
    <XBox
      className={clsx(
        className,
        'rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
      )}
      {...others}
    >
      {children}
    </XBox>
  )
}
