import type { PropsWithChildren } from 'react'
import React from 'react'

import type { BreadcrumbItem } from '@/components/partials/page-header/Breadcrumb'
import Breadcrumb from '@/components/partials/page-header/Breadcrumb'

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
        <h3 className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
          {children}
        </h3>
        {rightHeader && <div>{rightHeader}</div>}
      </div>
    </div>
  )
}
