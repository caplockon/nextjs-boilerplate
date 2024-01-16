import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import type { UserProfile } from '@/entities/common'

export const authorize = (
  router: AppRouterInstance,
  path: string,
  user?: UserProfile | undefined
): void => {
  if (path.startsWith('/login')) {
    return
  }

  if (!user) {
    router.push('/login')
  }
}
