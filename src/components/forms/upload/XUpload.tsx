import clsx from 'clsx'
import type { InputHTMLAttributes, PropsWithChildren } from 'react'
import React from 'react'

import { IconPlus, IconSpinner } from '@/components/icons'

export type XUploadProps = {
  label?: string | React.ReactNode
  wrapperClass?: string
  defaultPreviewFiles?: XUploadPreviewFileProps[]
  isLoading?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export type XUploadPreviewFileSrcType = string | File

export type XUploadPreviewFileProps = {
  src?: XUploadPreviewFileSrcType
  alt?: string
}

const getFileSourceKey = (src?: XUploadPreviewFileSrcType) => {
  return src instanceof File ? src.name : src
}

const getFileSourceUrl = (src?: XUploadPreviewFileSrcType) => {
  return src instanceof File ? URL.createObjectURL(src) : src
}

const XUploadPreview = (props: PropsWithChildren) => {
  return (
    <div className="relative block h-24 w-24 overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-100 hover:border-primary-50 hover:text-primary-50">
      {props.children}
    </div>
  )
}

const XUploadPreviewFile = (props: XUploadPreviewFileProps) => {
  const { src, alt } = props
  return (
    <XUploadPreview>
      <img src={getFileSourceUrl(src)} alt={alt ?? 'preview'} />
    </XUploadPreview>
  )
}

export const XUpload = (props: XUploadProps) => {
  const {
    label = null,
    defaultPreviewFiles,
    wrapperClass = 'mb-4',
    multiple = false,
    isLoading = false,
    ...others
  } = props

  const singlePreviewFile =
    defaultPreviewFiles && defaultPreviewFiles.length > 0
      ? defaultPreviewFiles[0]
      : undefined
  const isSinglePreview = !multiple && singlePreviewFile

  return (
    <div className={wrapperClass}>
      <label
        htmlFor={others.id}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>

      {multiple && defaultPreviewFiles && (
        <div>
          {defaultPreviewFiles.map((file) => (
            <XUploadPreviewFile key={getFileSourceKey(file.src)} {...file} />
          ))}
        </div>
      )}

      <XUploadPreview>
        {isSinglePreview && (
          <img
            src={getFileSourceUrl(singlePreviewFile?.src)}
            alt={singlePreviewFile?.alt ?? 'preview'}
          />
        )}

        {!isLoading && (
          <span
            className={clsx(
              'absolute left-0 top-0 flex h-full w-full flex-1 cursor-pointer items-center justify-center text-gray-400',
              {
                'opacity-0 hover:opacity-1': isSinglePreview,
                'opacity-1': !isSinglePreview,
              }
            )}
          >
            <IconPlus size={20} />
            <span>Upload</span>
          </span>
        )}

        {isLoading && (
          <span className="absolute left-0 top-0 flex h-full w-full flex-1 cursor-pointer items-center justify-center bg-gray-600 text-gray-100 opacity-15">
            <IconSpinner className="animate-spin text-gray-950" size={20} />
          </span>
        )}

        <input
          {...others}
          type="file"
          className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
        />
      </XUploadPreview>
    </div>
  )
}
