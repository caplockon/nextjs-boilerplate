import type { HTMLAttributes } from 'react'

import { XInput } from '@/components/forms'
import type { Address } from '@/entities/common'

export type XAddressProps = Address & HTMLAttributes<HTMLInputElement>

export const XAddress = (prop: XAddressProps) => {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-4">
        <XInput type="text" value={prop.street1} />
      </div>
      <div className="col-span-2">
        <XInput type="text" />
      </div>
      <div className="col-span-1">
        <XInput type="text" />
      </div>
      <div className="col-span-1">
        <XInput type="text" className="rounded-none" />
      </div>
    </div>
  )
}
