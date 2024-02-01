import type { PropsWithChildren } from 'react'

export const SidebarMenu = ({ children }: PropsWithChildren) => {
  return <ul className="space-y-2 font-medium">{children}</ul>
}
