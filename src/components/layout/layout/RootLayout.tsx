import type { PropsWithChildren } from 'react'

export function RootLayout({ children }: PropsWithChildren) {
  // Using internationalization in Client Components
  return <main>{children}</main>
}
