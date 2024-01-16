'use client'

import AppLogo from '@/components/layout/navbar/AppLogo'
import UserMenu from '@/components/layout/navbar/UserMenu'

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <AppLogo />
          </div>

          <div className="flex items-center">
            <div className="lex ms-3 items-center">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
