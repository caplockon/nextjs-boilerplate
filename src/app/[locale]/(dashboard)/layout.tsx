'use client'

import type { PropsWithChildren } from 'react'

import { Navbar, Sidebar } from '@/components/layout'
import { withAuthenticationRequired } from '@/providers/auth'

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />

      <Sidebar />

      <div className="mt-14 p-4 sm:ml-64">{children}</div>
    </>
  )
}

export default withAuthenticationRequired(DashboardLayout)
