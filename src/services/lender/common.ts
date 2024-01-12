import type { UploadedSingleFileResponse } from '@/entities/common'

import { http } from './http-client'

export const useUploadAPI = () => {
  async function uploadFile(file: File) {
    const form = new FormData()
    form.append('file', file)
    const response = await http.postForm<UploadedSingleFileResponse>(
      'upload-file',
      form
    )
    return response.data
  }

  return { uploadFile }
}
