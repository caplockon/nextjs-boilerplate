'use client'

import { XBox } from '@/components/data-display'
import { XButton } from '@/components/general/button/XButton'
import type { Lender } from '@/entities/lender'
import { useModalContext } from '@/providers/modal'
import { useNotificationContext } from '@/providers/notification'
import { useDeleteLender } from '@/services/pos/lender/delete-lender/delete-lender'

type DeleteLenderModalProps = {
  lender: Lender
  onDeleted?: () => void
}

export const DeleteLenderModal = (props: DeleteLenderModalProps) => {
  const { lender, onDeleted } = props
  const deleteLender = useDeleteLender()
  const { pushNotification } = useNotificationContext()
  const { hideModal } = useModalContext()

  const handleDeleteLender = async () => {
    if (lender.uid) {
      await deleteLender.mutateAsync({ uid: lender.uid })
      hideModal()
      onDeleted?.()
      pushNotification({
        message: `Deleted lender ${lender.name}`,
      })
    }
  }

  return (
    <XBox className="text-center" isLoading={deleteLender.isPending}>
      <p>
        Once you click the delete button later, the {lender.name} lender will be
        removed and cannot be restore. <br /> Are you sure to delete?
      </p>

      <div className="mt-5">
        <XButton onClick={handleDeleteLender}>Delete</XButton>
      </div>
    </XBox>
  )
}
