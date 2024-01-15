'use client'

import { useRouter } from 'next/navigation'

import { XInput, XToggle } from '@/components/forms'
import { XAddress } from '@/components/forms/address/XAddress'
import { XButton } from '@/components/general/button/XButton'
import type { Address } from '@/entities/common'
import type { Lender } from '@/entities/lender'
import { useLenderAPI } from '@/services/lender'
import { useForm, useFormError } from '@/utils/misc'
import LenderUploadLogo from '@/views/lender/components/LenderUploadLogo'
import { lenderSchema } from '@/views/lender/validation'

export type NewLenderForm = Lender & {}

const LenderCreateView = () => {
  const lenderAPI = useLenderAPI()
  const router = useRouter()

  // Initialize address data for lender
  const initialLenderAddress: Address = {
    city: '',
    state: '',
    zipcode: '',
    street_1: '',
  }
  // Initial lender data
  const initialLender: NewLenderForm = {
    name: '',
    is_active: false,
    address: initialLenderAddress,
  }

  const form = useForm<NewLenderForm>({
    /**
     * Setup initial values for lender form
     */
    initialValues: initialLender,
    /**
     * Define lender validation
     */
    validationSchema: lenderSchema,
    /**
     * Handle when form is submitted
     */
    onSubmit: async (values) => {
      const resource = await lenderAPI.create(values)
      await router.push(`/lenders/${resource.data.uid}`)
    },
  })

  const formError = useFormError(form)

  return (
    <form onSubmit={form.handleSubmit}>
      <XInput
        id="lender-name"
        type="text"
        label="Name"
        onChange={form.handleChange}
        defaultValue={form.values.name}
        error={formError('name')}
        name="name"
      />

      <XToggle
        id="lender-is-active"
        label="Is Active"
        name="is_active"
        onChange={form.handleChange}
        checked={form.values.is_active}
      />

      <LenderUploadLogo
        id="lender-logo"
        label="Lender Logo"
        name="logo"
        error={formError('logo')}
        logo={form.values.logo}
        onLogoChanged={(logo) => {
          form.setFieldValue('logo', logo)
        }}
      />

      <XAddress
        id="lender-address"
        label="Lender Address"
        name="lender_address"
        defaultAddressValue={form.values.address}
        errors={formError('address')}
      />

      <div>
        <XButton type="submit" color="primary">
          Create
        </XButton>
      </div>
    </form>
  )
}

LenderCreateView.displayName = 'LenderCreateView'

export default LenderCreateView
