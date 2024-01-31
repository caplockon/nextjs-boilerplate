import type { PropsWithChildren } from 'react'

import { AuthProvider } from '@/providers/auth'
import { useAuthServer } from '@/services/auth'

const AdminAuthProvider = ({ children }: PropsWithChildren) => {
  const auth = useAuthServer({
    baseUrl: 'http://localhost:8081',
    client_id: '9b390e27-455f-4568-8174-68c4d6cd6815',
    client_secret: '8RvEpeDzj693zmGdKUJJMVf6KiWSxkkd6GOUmWYi',
  })

  return <AuthProvider server={auth}>{children}</AuthProvider>
}

export default AdminAuthProvider
