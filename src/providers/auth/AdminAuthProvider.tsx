import type { PropsWithChildren } from 'react'

import { AuthProvider } from '@/providers/auth'
import { useAuthServer } from '@/services/auth'

const AdminAuthProvider = ({ children }: PropsWithChildren) => {
  const auth = useAuthServer({
    baseUrl: process.env.NEXT_PUBLIC_POS_API_URL || '',
    client_id: process.env.NEXT_PUBLIC_POS_API_ID || '',
    client_secret: process.env.NEXT_PUBLIC_POS_API_SECRET || '',
  })

  return <AuthProvider server={auth}>{children}</AuthProvider>
}

export default AdminAuthProvider
