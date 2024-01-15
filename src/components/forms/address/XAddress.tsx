import type { ChangeEvent, InputHTMLAttributes } from 'react'
import React from 'react'

import { XInput } from '@/components/forms'
import type { Address, KeysOf } from '@/entities/common'
import { useContextState } from '@/utils/misc'

export type XAddressProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string | React.ReactNode
  wrapperClass?: string
  onChangeAddress?: (e: ChangeEvent<HTMLInputElement>, values: any) => void
  defaultAddressValue?: Address
  errors?: KeysOf<Address> | string
  placeholders?: KeysOf<Address>
}

export const XAddress = (props: XAddressProps) => {
  const {
    label = null,
    defaultAddressValue,
    wrapperClass = 'mb-4',
    onChangeAddress,
    disabled,
    errors,
    placeholders = {
      street_1: 'Address Street',
      city: 'City',
      state: 'State',
      zipcode: 'Zipcode',
    },
    ...others
  } = props

  const [addressForm] = useContextState(
    defaultAddressValue || {
      city: '',
      state: '',
      zipcode: '',
      street_1: '',
    }
  )

  const allProps = {
    disabled,
  }

  return (
    <div className={wrapperClass}>
      {label && (
        <label
          htmlFor={others.id ? `${others.id}-street1` : undefined}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-4">
          <XInput
            id={others.id ? `${others.id}-street1` : undefined}
            type="text"
            name={others.name ? `${others.name}_street1` : undefined}
            defaultValue={addressForm?.street_1}
            onChange={(e) => {
              addressForm.street_1 = e.target.value
              onChangeAddress?.(e, addressForm)
            }}
            {...allProps}
            error={typeof errors === 'object' ? errors?.street_1 : errors}
            wrapperClass=""
            placeholder={placeholders?.street_1}
          />
        </div>
        <div className="col-span-2">
          <XInput
            id={others.id ? `${others.id}-city` : undefined}
            name={others.name ? `${others.name}_city` : undefined}
            type="text"
            defaultValue={addressForm?.city}
            onChange={(e) => {
              addressForm.city = e.target.value
              onChangeAddress?.(e, addressForm)
            }}
            error={typeof errors === 'object' ? errors?.city : undefined}
            {...allProps}
            placeholder={placeholders?.city}
          />
        </div>
        <div className="col-span-1">
          <XInput
            id={others.id ? `${others.id}-state` : undefined}
            name={others.name ? `${others.name}_state` : undefined}
            type="text"
            defaultValue={addressForm?.state}
            onChange={(e) => {
              addressForm.state = e.target.value
              onChangeAddress?.(e, addressForm)
            }}
            {...allProps}
            error={typeof errors === 'object' ? errors?.state : undefined}
            placeholder={placeholders?.state}
          />
        </div>
        <div className="col-span-1">
          <XInput
            id={others.id ? `${others.id}-zipcode` : undefined}
            name={others.name ? `${others.name}_zipcode` : undefined}
            type="text"
            defaultValue={addressForm?.zipcode}
            onChange={(e) => {
              addressForm.zipcode = e.target.value
              onChangeAddress?.(e, addressForm)
            }}
            error={typeof errors === 'object' ? errors?.zipcode : undefined}
            {...allProps}
            placeholder={placeholders?.zipcode}
          />
        </div>
      </div>
    </div>
  )
}
