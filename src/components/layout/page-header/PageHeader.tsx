import type { PropsWithChildren } from 'react'
import React from 'react'

import { XHeading2 } from '@/components/data-display'
import type { BreadcrumbItem } from '@/components/layout/breadcrumb/Breadcrumb'
import { Breadcrumb } from '@/components/layout/breadcrumb/Breadcrumb'

export type PageHeaderProps = PropsWithChildren & {
  breadcrumb?: BreadcrumbItem[]
  rightHeader?: React.ReactNode
}

export default function PageHeader({
  children,
  breadcrumb,
  rightHeader,
}: PageHeaderProps) {
  return (
    <div>
      {breadcrumb && <Breadcrumb items={breadcrumb} />}

      <div className="mb-4 flex justify-between">
        <XHeading2>{children}</XHeading2>
        {rightHeader && <div>{rightHeader}</div>}
      </div>
    </div>
  )
}
