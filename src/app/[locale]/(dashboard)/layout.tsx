'use client'

import type { PropsWithChildren } from 'react'

import Navbar from '@/components/layout/navbar/Navbar'
import Sidebar from '@/components/layout/sidebar/Sidebar'

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />

      <Sidebar />

      <div className="mt-14 p-4 sm:ml-64">{children}</div>
    </>
  )
}
