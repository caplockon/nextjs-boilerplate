import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { LoadingState } from '@/components/general'

const AuthUnauthenticated = ({ next }: { next?: string }) => {
  const router = useRouter()
  useEffect(() => {
    if (next) router.push(next)
  }, [next, router])
  return <LoadingState />
}

export default AuthUnauthenticated
