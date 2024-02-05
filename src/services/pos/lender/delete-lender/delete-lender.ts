import { useMutation } from '@tanstack/react-query'

import { http } from '@/services/pos/common/http-client'

type DeleteLenderProps = {
  uid: string
}

const mutationFn = ({ uid }: DeleteLenderProps) => {
  return http.delete(`/lenders/${uid}`)
}

export const useDeleteLender = () => {
  return useMutation({
    mutationFn,
  })
}
