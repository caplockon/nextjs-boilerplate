'use client'

import React, { memo, useEffect, useState } from 'react'

import type { Lender } from '@/entities/lender'
import { useLenderAPI } from '@/services/lender'
import LenderEditView from '@/views/lender/lender-edit/LenderEditView'

type LenderEditPageProp = {
  params: {
    uid: string
  }
}

const LenderEditPage = memo((props: LenderEditPageProp) => {
  const lenderAPI = useLenderAPI<Lender>()
  const [lender, setLender] = useState<Lender>()

  useEffect(() => {
    lenderAPI.get(props.params.uid).then((res) => setLender(res.data))
  }, [])
  return <div>{lender && <LenderEditView lender={lender} />}</div>
})
LenderEditPage.displayName = 'LenderEditPage'

export default LenderEditPage
