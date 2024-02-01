import { useMutation } from '@tanstack/react-query'

import type { ResourceResponse } from '@/entities/laravel-conventions'
import type { Lender } from '@/entities/lender'
import { http } from '@/services/pos/common/http-client'

type UpdateLenderProps = {
  uid: string
  payload: any
}
const updateLender = async ({
  uid,
  payload,
}: UpdateLenderProps): Promise<ResourceResponse<Lender>> => {
  const response = await http.patch<ResourceResponse<Lender>>(
    `/lenders/${uid}`,
    payload
  )
  return response.data
}

export const useUpdateLender = () => {
  return useMutation({
    mutationFn: updateLender,
  })
}
