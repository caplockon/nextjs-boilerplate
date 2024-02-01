import { useMutation } from '@tanstack/react-query'

import type {
  ListRequestCriteria,
  PaginatorResponse,
} from '@/entities/laravel-conventions'
import type { Lender } from '@/entities/lender'
import type { MutationConfig } from '@/providers/react-query'
import { http } from '@/services/pos/common/http-client'

type LenderPaginatorResponse = PaginatorResponse<Lender>
const fetchLender = async (
  req: ListRequestCriteria = {}
): Promise<LenderPaginatorResponse> => {
  const response = await http.get<LenderPaginatorResponse>('/lenders', {
    params: req,
  })
  return response.data
}

type UseFetchLenderOptions = {
  config?: MutationConfig<typeof fetchLender>
}

export const useFetchLender = ({ config }: UseFetchLenderOptions = {}) => {
  return useMutation({
    mutationFn: fetchLender,
    ...config,
  })
}
