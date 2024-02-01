'use client'

import { XButton } from '@/components/general/button/XButton'
import { IconTrash } from '@/components/icons'

export default function LenderEntireActions() {
  return (
    <XButton variant="plain">
      <IconTrash size={15} />
    </XButton>
  )
}
