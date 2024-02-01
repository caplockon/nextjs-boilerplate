'use client'

import type { ChangeEvent } from 'react'

import type { XUploadProps } from '@/components/forms'
import { XUpload } from '@/components/forms'
import type { UploadedSingleFileResponse } from '@/entities/common'
import { useUploadSingleFile } from '@/services/pos/file-upload'

export type LenderUploadLogoProps = XUploadProps & {
  logo?: string
  onLogoChanged?: (logo?: string) => void
  upload?: (file: File) => UploadedSingleFileResponse
}

const LenderUploadLogo = (props: LenderUploadLogoProps) => {
  const { logo, onLogoChanged = () => {}, ...others } = props
  const uploadSingleFile = useUploadSingleFile()

  const handleLogoChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.item(0)

    if (file) {
      // Upload file to server
      const uploadedFileResponse = await uploadSingleFile.mutateAsync({ file })
      // Update log path to the form
      if (uploadedFileResponse.path) {
        onLogoChanged(uploadedFileResponse.path)
      }
    } else {
      // If the logo is not set, then fallback to the original logo
      onLogoChanged(logo)
    }
  }

  return (
    <XUpload
      defaultPreviewFiles={
        logo
          ? {
              src: logo,
              alt: 'lender-logo',
            }
          : undefined
      }
      multiple={false}
      onChange={handleLogoChanged}
      isLoading={uploadSingleFile.isPending}
      {...others}
    />
  )
}

export default LenderUploadLogo
