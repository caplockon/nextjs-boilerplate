import type { Lender } from '@/entities/lender'

import { useRestApiResource } from './http-client'

export const useLenderAPI = <T = Lender>() => useRestApiResource<T>('lenders')
