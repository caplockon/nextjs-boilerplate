import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const AuthUnauthenticated = ({ next }: { next?: string }) => {
  const router = useRouter()
  useEffect(() => {
    if (next) router.push(next)
  }, [])
  return <div>Unauthenticated</div>
}

export default AuthUnauthenticated
