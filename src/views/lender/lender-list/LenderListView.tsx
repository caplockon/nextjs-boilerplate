'use client'

import React, { useEffect, useState } from 'react'

import type { XTableColumn } from '@/components/collection'
import { XPagination, XTable } from '@/components/collection'
import type { PaginatorMeta } from '@/entities/laravel-conventions'
import type { Lender } from '@/entities/lender'
import { useLenderAPI } from '@/services/lender'

type LenderRow = Lender & {}

const columns: XTableColumn<LenderRow>[] = [
  {
    name: 'uid',
    label: 'Uid',
    render: (value) => value.uid,
  },
]

export function LenderListView() {
  const [paginatorMeta, setPaginatorMeta] = useState<PaginatorMeta>()
  const [dataSource, setDataSource] = useState<LenderRow[]>([])
  const getLenderList = useLenderAPI<LenderRow>().list
  const pageSize = 5

  const fetchLender = (page: number, size: number) => {
    getLenderList({ per_page: size, page }).then((res) => {
      setDataSource(res.data)
      setPaginatorMeta(res.meta)
    })
  }

  useEffect(() => {
    fetchLender(1, pageSize)
  }, [])

  return (
    <>
      <XTable columns={columns} dataSource={dataSource} />

      {paginatorMeta && (
        <div className="mt-4 flex justify-end px-5">
          <XPagination
            pageSize={paginatorMeta.per_page}
            defaultCurrent={paginatorMeta.current_page}
            total={paginatorMeta.total}
            onChange={fetchLender}
          />
        </div>
      )}
    </>
  )
}
