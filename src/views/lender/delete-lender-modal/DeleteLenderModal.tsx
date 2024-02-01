'use client'

import { useState } from 'react'

import { XModal } from '@/components/data-display'
import type { Lender } from '@/entities/lender'

type DeleteLenderModalProps = {
  lender: Lender
}

export const DeleteLenderModal = ({ lender }: DeleteLenderModalProps) => {
  const [open, setOpen] = useState(true)
  return (
    <XModal open={open} onClose={() => setOpen(false)} title="Delete Lender">
      <div>{lender.name}</div>
    </XModal>
  )
}
