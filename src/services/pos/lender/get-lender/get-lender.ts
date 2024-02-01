import { useMutation } from '@tanstack/react-query'

import type { ResourceResponse } from '@/entities/laravel-conventions'
import type { Lender } from '@/entities/lender'
import type { MutationConfig } from '@/providers/react-query'
import { http } from '@/services/pos/common/http-client'

const getLender = async (uid: string) => {
  const response = await http.get<ResourceResponse<Lender>>(`/lenders/${uid}`)
  return response.data
}

type UseGetLenderOptions = {
  config?: MutationConfig<typeof getLender>
}

export const useGetLender = ({ config }: UseGetLenderOptions = {}) => {
  return useMutation({
    mutationFn: getLender,
    ...config,
  })
}
