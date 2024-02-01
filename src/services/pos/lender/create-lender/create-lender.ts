import { useMutation } from '@tanstack/react-query'

import type { ResourceResponse } from '@/entities/laravel-conventions'
import type { Lender } from '@/entities/lender'
import { http } from '@/services/pos/common/http-client'

type CreateLenderProps = {
  payload: any
}

const mutationFn = async ({ payload }: CreateLenderProps) => {
  const response = await http.post<ResourceResponse<Lender>>(
    `/lenders`,
    payload
  )
  return response.data
}

export const useCreateLender = () => {
  return useMutation({ mutationFn })
}
