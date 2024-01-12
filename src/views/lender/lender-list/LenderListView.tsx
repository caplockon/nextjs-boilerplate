'use client'

import React, { useEffect, useState } from 'react'

import type { XTableColumn } from '@/components/collection'
import { XPagination, XTable } from '@/components/collection'
import { XAvatar, XTag } from '@/components/data-display';
import type { PaginatorMeta } from '@/entities/laravel-conventions'
import type { Lender } from '@/entities/lender'
import { useLenderAPI } from '@/services/lender'
import dayjs from 'dayjs';
import LenderEntireActions from '@/views/lender/lender-list/LenderEntireActions';

type LenderRow = Lender & {}

const columns: XTableColumn<LenderRow>[] = [
  {
    name: 'uid',
    label: 'Uid',
    render: (lender) => (
      <a href={`/lenders/${lender.uid}`}>
        <XTag>{lender.uid?.substring(0, 8)}</XTag>
      </a>
    ),
  },
  {
    name: 'logo',
    label: 'Logo',
    render: (lender) => <XAvatar src={lender.logo} />,
  },
  {
    name: 'name',
    label: 'name',
  },
  {
    name: 'is_active',
    label: 'Is Active',
    render: (lender) => lender.is_active ? 'Yes' : 'No',
  },
  {
    name: 'created_at',
    label: 'Created At',
    render: (lender) => dayjs(lender.created_at).format('MMM d, YYYY'),
  },
  {
    name: 'actions',
    label: 'Actions',
    render: () => <LenderEntireActions />,
    cellClass: 'text-center',
    theadClass: 'text-center',
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
      <XTable
        columns={columns}
        dataSource={dataSource}
        recordKey={(record) => record.uid}
        border
      />

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
