'use client'

import React, { memo } from 'react'

import { XInput, XToggle } from '@/components/forms'
import { XAddress } from '@/components/forms/address/XAddress'
import { XButton } from '@/components/general/button/XButton'
import { XLink } from '@/components/general/link/XLink'
import {
  IconCircleCheck,
  IconHomeOutline,
  IconWarning,
} from '@/components/icons'
import type { BreadcrumbItem } from '@/components/partials/page-header/Breadcrumb'
import PageHeader from '@/components/partials/page-header/PageHeader'
import type { Address, KeysOf } from '@/entities/common'
import type { Lender } from '@/entities/lender'
import { useLenderAPI } from '@/services/lender'
import { useForm, useFormError } from '@/utils/misc'
import LenderUploadLogo from '@/views/lender/components/LenderUploadLogo'
import { lenderSchema } from '@/views/lender/validation'

/**
 * Define properties for the view
 */
type LenderEditViewProps = {
  lender: Lender & {}
}

const LenderEditView = memo((props: LenderEditViewProps) => {
  const { lender } = props

  /**
   * Initialize APIs to interact with lender object
   */
  const lenderAPI = useLenderAPI()

  /**
   * Create new form instance for the given lender object
   */
  const form = useForm<Lender>({
    /**
     * Set initial value for the form
     */
    initialValues: lender,

    /**
     * Set validation schema to validate data when the end-user clicks the Submit button
     */
    validationSchema: lenderSchema,

    /**
     * Handle submit - Calling to server to update lender
     * This will be trigger after all fields of form are validated
     * @param values
     */
    onSubmit: async (values) => {
      await lenderAPI.update(lender.uid ?? '', values)
    },
  })

  /**
   * Variable to manage errors of the form
   */
  const formError = useFormError(form)

  const breadcrumb: BreadcrumbItem[] = [
    {
      label: 'Lender',
      icon: <IconHomeOutline className="mr-2" size={16} />,
      link: '/lenders',
    },
    {
      label: 'Edit Lender',
    },
  ]

  /**
   * Render the form
   */
  return (
    <>
      <PageHeader breadcrumb={breadcrumb}>
        Edit Lender - {lender.name}
      </PageHeader>

      <div className="max-w-lg">
        <form onSubmit={form.handleSubmit}>
          <XInput
            id="lender-uid"
            type="text"
            label="Uid"
            readOnly
            disabled
            defaultValue={lender.uid}
          />

          <XInput
            id="lender-name"
            type="text"
            label="Lender Name"
            name="name"
            onChange={form.handleChange} // Update changed value into form
            defaultValue={form.values.name}
            disabled={form.isSubmitting} // While form is submitting, this field will be disabled
            error={formError('name')}
          />

          <XToggle
            id="lender-is-active"
            label="Is Active"
            name="is_active"
            checked={form.values.is_active}
            onChange={form.handleChange} // Update changed value into form
            disabled={form.isSubmitting} // While form is submitting, this field will be disabled
          />

          <LenderUploadLogo
            id="lender-logo"
            label="Lender Logo"
            name="logo"
            logo={form.values.logo}
            error={formError('logo')}
            onLogoChanged={(logo) => {
              form.setFieldValue('logo', logo)
            }}
            disabled={form.isSubmitting} // While form is submitting, this field will be disabled
          />

          <XAddress
            id="lender-address"
            label={
              <div className="flex">
                <span>Lender Address</span>
                {form.values.address && ( // Display validation status of address
                  <XLink href="#" className="ml-2">
                    {!form.values.address.is_validated && (
                      <IconWarning className="text-danger" size={18} />
                    )}
                    {form.values.address.is_validated && (
                      <IconCircleCheck className="text-success" size={18} />
                    )}
                  </XLink>
                )}
              </div>
            }
            name="lender_address"
            defaultAddressValue={
              form.values.address !== null ? form.values.address : undefined
            }
            onChangeAddress={(e, address) => {
              form.values.address = address
            }} // Update changed value into form
            disabled={form.isSubmitting} // While form is submitting, this field will be disabled
            errors={formError<KeysOf<Address> | string>('address')}
          />

          <div>
            <XButton
              type="submit"
              color="primary"
              isLoading={form.isSubmitting} // Show spinner while form is submitting
              disabled={form.isSubmitting} // While form is submitting, this field will be disabled
            >
              Submit
            </XButton>
          </div>
        </form>
      </div>
    </>
  )
})
LenderEditView.displayName = 'LenderEditView'
export default LenderEditView
