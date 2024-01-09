'use client'

import { useEffect, useState } from 'react'

import {
  useForm,
  XForm,
  XFormItem,
  XInput,
  XToggle,
  XUpload,
} from '@/components/forms'
import { XAddress } from '@/components/forms/address/XAddress'
import { XButton } from '@/components/general/button/XButton'
import type { Lender } from '@/entities/lender'

type LenderEditViewProps = {
  lender: Lender & {}
}

export default function LenderEditView(props: LenderEditViewProps) {
  const { lender } = props
  const [lenderLogo, setLenderLogo] = useState(lender.logo)

  const [lenderForm] = useForm()
  useEffect(() => lender && lenderForm.setFieldsValue(lender), [])
  const onFinishHandler = (values: Lender) => console.log(values)
  const setLogoPath = (path: string) => {
    setLenderLogo(path)
    lenderForm.setFieldValue('logo', path)
  }

  return (
    <>
      <h1>Edit Lender - {lender.name}</h1>

      <XForm form={lenderForm} layout="vertical" onFinish={onFinishHandler}>
        <XFormItem<Lender> name="uid" label="Lender Uid">
          <XInput type="text" readOnly />
        </XFormItem>

        <XFormItem<Lender> name="name" label="Lender Name">
          <XInput type="text" />
        </XFormItem>

        <XFormItem<Lender> label="Upload">
          <XUpload
            name="file"
            listType="picture-card"
            multiple={false}
            showUploadList={false}
            action="http://localhost:8081/upload-file"
            onChange={(change) => {
              console.log(change)
              if (change.file.response) setLogoPath(change.file.response.path)
            }}
          >
            {lenderLogo && (
              <img src={lenderLogo} alt="dddd" className="w-full rounded" />
            )}
          </XUpload>
        </XFormItem>

        <XFormItem<Lender> name="is_active" label="Is Active">
          <XToggle value />
        </XFormItem>

        <XFormItem name="address" label="Company Address">
          <XAddress />
        </XFormItem>

        <div>
          <XButton htmlType="submit" type="primary">
            Submit
          </XButton>
        </div>
      </XForm>
    </>
  )
}
