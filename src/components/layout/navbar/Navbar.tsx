'use client'

import { useRouter } from 'next/navigation'

import { AppLogo } from '@/components/layout/app-logo/AppLogo'
import { UserMenu, UserMenuItem } from '@/components/layout/user-menu/UserMenu'
import { useAuthContext } from '@/lib/auth/auth'

export function Navbar() {
  const { user, logout } = useAuthContext()
  const router = useRouter()
  const handleLogout = () => {
    logout().then(() => router.push('/login'))
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <AppLogo />
          </div>

          {user && (
            <div className="flex items-center">
              <div className="lex ms-3 items-center">
                <UserMenu user={user}>
                  <UserMenuItem>Dashboard </UserMenuItem>
                  <UserMenuItem onClick={handleLogout}>Sign-Out</UserMenuItem>
                </UserMenu>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
