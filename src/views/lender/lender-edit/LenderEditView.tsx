'use client'

import type { ChangeEvent } from 'react'
import { memo, useState } from 'react'

import { XPageHeader } from '@/components/data-display'
import {
  useForm,
  useFormError,
  XInput,
  XToggle,
  XUpload,
} from '@/components/forms'
import { XAddress } from '@/components/forms/address/XAddress'
import { XButton } from '@/components/general/button/XButton'
import { XLink } from '@/components/general/link/XLink'
import { IconCircleCheck, IconWarning } from '@/components/icons'
import type { Address, KeysOf } from '@/entities/common'
import type { Lender } from '@/entities/lender'
import { useLenderAPI, useUploadAPI } from '@/services/lender'
import { defineSchema } from '@/utils/misc'

/**
 * Define properties for the view
 */
type LenderEditViewProps = {
  lender: Lender & {}
}

/**
 * Define validation rules for lender form
 */
const lenderSchema = defineSchema<Lender>((rule) => ({
  name: rule.string().required().min(5),
  is_active: rule.boolean().required(),
  logo: rule.string().nullable(),
  address: rule.object().required().shape({
    city: rule.string().required('City is required field'),
    street_1: rule.string().required('Address Street is required field'),
    state: rule.string().required('State is required field'),
    zipcode: rule.string().required('Zipcode is required field'),
  }),
}))

const LenderEditView = memo((props: LenderEditViewProps) => {
  const { lender } = props

  /**
   * Initialize APIs to upload file
   */
  const uploadAPI = useUploadAPI()

  /**
   * Initialize APIs to interact with lender object
   */
  const lenderAPI = useLenderAPI()

  /**
   * State to know the lender logo is uploading
   */
  const [isUploadLogo, setIsUploadLogo] = useState(false)

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

  /**
   * Handle to upload lender logo when the end-user changes it
   * @param e
   */
  const onLogoChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.item(0)

    if (file) {
      // Upload file to server
      setIsUploadLogo(true)
      const uploadedFileResponse = await uploadAPI.uploadFile(file)
      setIsUploadLogo(false)

      // Update log path to the form
      if (uploadedFileResponse.path) {
        form.values.logo = uploadedFileResponse.path
      }
    } else {
      // If the logo is not set, then fallback to the original logo
      form.values.logo = lender.logo
    }
  }

  /**
   * Render the form
   */
  return (
    <>
      <XPageHeader>Edit Lender - {lender.name}</XPageHeader>

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

        <XUpload
          id="lender-logo"
          label="Lender Logo"
          name="logo"
          defaultPreviewFiles={(form.values.logo ? [form.values.logo] : []).map(
            // Build preview logo
            (src) => ({
              src,
              alt: 'preview',
            })
          )}
          isLoading={isUploadLogo}
          onChange={onLogoChanged}
          error={formError('logo')}
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
          defaultAddressValue={form.values.address ?? undefined}
          onChangeAddress={(e, address) => {
            form.values.address = address
          }} // Update changed value into form
          disabled={form.isSubmitting} // While form is submitting, this field will be disabled
          errors={formError<KeysOf<Address>>('address')}
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
    </>
  )
})
LenderEditView.displayName = 'LenderEditView'
export default LenderEditView
