import React from 'react'

import { XLink } from '@/components/general/link/XLink'
import { IconChevronRight } from '@/components/icons'

export type BreadcrumbItem = {
  label: string
  link?: string
  icon?: React.ReactNode
}

export type BreadcrumbProps = {
  items?: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex py-3 text-gray-700" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 align-middle md:space-x-2 rtl:space-x-reverse">
        {items?.map((item, index) => (
          <li key={item.label} className="inline-flex items-center">
            {item.link ? (
              <XLink
                link={item.link}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                {index > 0 ? <IconChevronRight size={16} /> : item.icon}
                {item.label}
              </XLink>
            ) : (
              <span className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400">
                {index > 0 ? (
                  <IconChevronRight size={16} className="mr-1" />
                ) : (
                  item.icon
                )}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
