import { useMutation } from '@tanstack/react-query'

import type { UploadedSingleFileResponse } from '@/entities/common'
import { http } from '@/services/pos/common/http-client'

type UploadSingleFileProps = {
  file: File
}

const mutationFn = async ({ file }: UploadSingleFileProps) => {
  const form = new FormData()
  form.append('file', file)
  const response = await http.postForm<UploadedSingleFileResponse>(
    'upload-file',
    form
  )
  return response.data
}

export const useUploadSingleFile = () => {
  return useMutation({ mutationFn })
}
