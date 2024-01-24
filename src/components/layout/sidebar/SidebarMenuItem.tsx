import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import React from 'react'

export type SidebarMenuItemProps = PropsWithChildren &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    icon?: React.ReactNode
    label?: string
  }

export default function SidebarMenuItem({
  children,
  icon,
  label,
  ...others
}: SidebarMenuItemProps) {
  return (
    <li>
      <a
        {...others}
        className="group flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        {icon}
        {label && <span className="ms-3">{label}</span>}
        {children}
      </a>
    </li>
  )
}
