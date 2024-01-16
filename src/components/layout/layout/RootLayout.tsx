import type { PropsWithChildren } from 'react'

export default function RootLayout({ children }: PropsWithChildren) {
  // Using internationalization in Client Components
  return <main>{children}</main>
}
