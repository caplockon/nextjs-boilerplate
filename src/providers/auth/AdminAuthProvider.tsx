import type { PropsWithChildren } from 'react'

import { AuthProvider } from '@/providers/auth'
import { useAuthServer } from '@/services/auth'

const AdminAuthProvider = ({ children }: PropsWithChildren) => {
  const auth = useAuthServer({
    baseUrl: 'http://localhost:8081',
    client_id: '9b1a5107-68b9-4024-aaba-f9871737b04d',
    client_secret: 'aEEB5MDaMlWQ0NmyaBoNMaAKiuoWs8B98lPyKf1X',
  })

  return <AuthProvider server={auth}>{children}</AuthProvider>
}

export default AdminAuthProvider
