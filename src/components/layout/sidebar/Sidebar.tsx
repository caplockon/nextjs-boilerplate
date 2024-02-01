import { useRouter } from 'next/navigation'

import {
  IconDashboard,
  IconLender,
  IconSettingsOutline,
} from '@/components/icons'
import { SidebarMenu } from '@/components/layout/sidebar-menu/SidebarMenu'
import { SidebarMenuItem } from '@/components/layout/sidebar-menu-item/SidebarMenuItem'

export function Sidebar() {
  const router = useRouter()
  return (
    <aside
      className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform sm:translate-x-0 dark:border-gray-700 dark:bg-gray-800"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
        <SidebarMenu>
          <SidebarMenuItem
            onClick={() => router.push('/dashboard')}
            icon={<IconDashboard size={22} />}
            label="Dashboard"
          />

          <SidebarMenuItem
            onClick={() => router.push('/lenders')}
            icon={<IconLender size={22} />}
            label="Lenders"
          />

          <SidebarMenuItem
            href="/"
            icon={<IconSettingsOutline size={22} />}
            label="Settings"
          />
        </SidebarMenu>
      </div>
    </aside>
  )
}
