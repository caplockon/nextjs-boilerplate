'use client'

import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

import type { XTableColumn } from '@/components/collection'
import { XPagination, XTable } from '@/components/collection'
import { XAvatar, XTag } from '@/components/data-display'
import { XCard } from '@/components/data-display/card/XCard'
import { XLink } from '@/components/general'
import type { PaginatorMeta } from '@/entities/laravel-conventions'
import type { Lender } from '@/entities/lender'
import { useFetchLender } from '@/services/pos/lender'
import LenderEntireActions from '@/views/lender/lender-list/LenderEntireActions'

type LenderRow = Lender & {}

function useLenderTableColumns(): XTableColumn<LenderRow>[] {
  return [
    {
      name: 'uid',
      label: 'Uid',
      render: (lender) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <XLink link={`/lenders/${lender.uid}`}>
          <XTag>{lender.uid?.substring(0, 8)}</XTag>
        </XLink>
      ),
    },
    {
      name: 'logo',
      label: 'Logo',
      render: (lender) => <XAvatar src={lender.logo} />,
    },
    {
      name: 'name',
      label: 'Name',
    },
    {
      name: 'is_active',
      label: 'Is Active',
      render: (lender) => (lender.is_active ? 'Yes' : 'No'),
      cellClass: 'text-center',
      theadClass: 'text-center',
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
}

export function LenderListView() {
  const [paginatorMeta, setPaginatorMeta] = useState<PaginatorMeta>()
  const [dataSource, setDataSource] = useState<LenderRow[]>([])
  const pageSize = 5
  const columns = useLenderTableColumns()
  const fetchLender = useFetchLender()

  useEffect(() => {
    fetchLender
      .mutateAsync({
        page: 1,
        per_page: pageSize,
      })
      .then((result) => {
        setPaginatorMeta(result.meta)
        setDataSource(result.data)
      })
  }, [pageSize])

  return (
    <XCard className="py-4" isLoading={fetchLender.isPending}>
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
            onChange={(page: number) => {
              fetchLender
                .mutateAsync({
                  page,
                  per_page: pageSize,
                })
                .then((res) => {
                  setPaginatorMeta(res.meta)
                  setDataSource(res.data)
                })
            }}
          />
        </div>
      )}
    </XCard>
  )
}
