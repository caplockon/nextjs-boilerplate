'use client'

import React, { useEffect, useState } from 'react'

import type { Lender } from '@/entities/lender'
import { useGetLender } from '@/services/pos/lender'
import LenderEditView from '@/views/lender/lender-edit/LenderEditView'

type LenderEditPageProp = {
  params: {
    uid: string
  }
}

const LenderEditPage = (props: LenderEditPageProp) => {
  const getLender = useGetLender()
  const [lender, setLender] = useState<Lender>()

  useEffect(() => {
    getLender.mutateAsync(props.params.uid).then((res) => setLender(res.data))
  }, [props])
  return <div>{lender && <LenderEditView lender={lender} />}</div>
}

export default LenderEditPage
