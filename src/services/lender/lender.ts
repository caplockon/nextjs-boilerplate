import { useMutation } from '@tanstack/react-query'

import type {
  ListRequestCriteria,
  PaginatorResponse,
} from '@/entities/laravel-conventions'
import type { Lender } from '@/entities/lender'

import { http, useRestApiResource } from './http-client'
import { MutationConfig } from '@/providers/react-query'

export const useLenderAPI = <T = Lender>() => useRestApiResource<T>('lenders')

const fetchLender = async <T = Lender>(req?: ListRequestCriteria) => {
  const reqParams = {
    page: req?.page,
    per_page: req?.per_page,
  }
  const response = await http.get<PaginatorResponse<T>>('/lenders', {
    params: reqParams,
  })
  return response.data
}

type UseFetchLenderOptions<T> = {
  config?: MutationConfig<typeof fetchLender<T>>
}

export const useFetchLender = <T = Lender>({
  config,
}: UseFetchLenderOptions<T> = {}) => {
  const api = useRestApiResource<T>('lenders')
  return useMutation({
    mutationFn: (req?: ListRequestCriteria) => {
      return api.list(req)
    },
    ...config,
  })
}
