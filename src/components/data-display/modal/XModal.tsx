'use client'

import type { ModalProps } from '@mui/base'
import { Modal } from '@mui/base'
import clsx from 'clsx'
import { forwardRef } from 'react'

import { IconTimesCircle } from '@/components/icons'

const Backdrop = forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className } = props
  return (
    <div
      className={clsx(
        {
          'bg-gray-900 opacity-50 dark:opacity-80 fixed inset-0 z-40': open,
        },
        className
      )}
      ref={ref}
    />
  )
})
Backdrop.displayName = 'Backdrop'

type XModalProps = ModalProps & {
  title?: string
  onClose?: (
    event: any,
    reason: 'backdropClick' | 'escapeKeyDown' | 'buttonCloseClick'
  ) => void
}

export const XModal = ({
  children,
  title,
  onClose,
  className,
  ...props
}: XModalProps) => {
  return (
    <Modal
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0'
      )}
      slots={{ backdrop: Backdrop }}
      onClose={onClose}
      {...props}
    >
      <div className="relative z-50 mx-auto max-h-full w-full max-w-2xl outline-0">
        <div className="relative w-full rounded-lg bg-white">
          <div className="relative flex justify-center p-2 align-middle">
            <IconTimesCircle
              className="absolute left-2 cursor-pointer"
              size={20}
              onClick={() => onClose?.({}, 'buttonCloseClick')}
            />
            <h3>{title || 'Modal'}</h3>
          </div>
          <div className="px-2 py-3">{children}</div>
        </div>
      </div>
    </Modal>
  )
}
