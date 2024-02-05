'use client'

import React from 'react'

import { XButton } from '@/components/general/button/XButton'
import { IconTrash } from '@/components/icons'
import type { Lender } from '@/entities/lender'
import { useModalContext } from '@/providers/modal'
import { DeleteLenderModal } from '@/views/lender/delete-lender-modal/DeleteLenderModal'

type LenderEntireActionsProps = {
  lender: Lender
  onDeleted?: () => void
}

export default function LenderEntireActions(props: LenderEntireActionsProps) {
  const { lender, onDeleted } = props
  const { showModal, setTitle } = useModalContext()

  return (
    <XButton
      variant="plain"
      onClick={() => {
        setTitle(`Delete Lender`)
        showModal(<DeleteLenderModal lender={lender} onDeleted={onDeleted} />)
      }}
    >
      <IconTrash size={15} />
    </XButton>
  )
}
