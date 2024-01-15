import type { PropsWithChildren } from 'react'

export default function SidebarMenu({ children }: PropsWithChildren) {
  return <ul className="space-y-2 font-medium">{children}</ul>
}
