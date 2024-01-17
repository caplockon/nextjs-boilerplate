import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'

import { XDropdown } from '@/components/navigation/dropdown/XDropdown'
import type { UserProfile } from '@/entities/common'

const UserAvatarButton = ({ handleClick }: any) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      aria-expanded="false"
    >
      <span className="sr-only">Open user menu</span>
      <img
        className="h-8 w-8 rounded-full"
        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
      />
    </button>
  )
}

export type UserMenuItemProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  PropsWithChildren & {}

export function UserMenuItem({ children, ...others }: UserMenuItemProps) {
  return (
    <li>
      <a
        {...others}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
        role="menuitem"
      >
        {children}
      </a>
    </li>
  )
}

export type UserMenuProps = PropsWithChildren & {
  user: UserProfile
}

export function UserMenu({ children, user }: UserMenuProps) {
  return (
    <XDropdown label={<UserAvatarButton />}>
      <div className="px-4 py-3" role="none">
        <p className="text-sm text-gray-900 dark:text-white" role="none">
          {user?.name}
        </p>
        <p
          className="truncate text-sm font-medium text-gray-900 dark:text-gray-300"
          role="none"
        >
          {user?.email}
        </p>
      </div>
      <ul className="py-1" role="none">
        {children}
      </ul>
    </XDropdown>
  )
}
