'use client'

import { useState } from 'react'

import { XButton } from '@/components/general/button/XButton'

export type XPaginationProps = {
  total?: number
  pageSize?: number
  defaultCurrent?: number
  onChange?: (page: number, pageSize: number) => void
}

export const XPagination = (props: XPaginationProps) => {
  const {
    total = 0,
    pageSize = 10,
    defaultCurrent = 1,
    onChange = () => {},
  } = props
  const count = Math.ceil(total / pageSize)
  const [current, setCurrent] = useState(defaultCurrent)

  const pages = Array.from({ length: count }, (value, index) => ({
    number: index + 1,
  }))

  const pageClickHandler = (page: number) => {
    setCurrent(page)
    onChange(page, pageSize)
  }

  return (
    <nav aria-label="pagination navigation">
      <ul className="flex list-none gap-1">
        <li>
          <XButton
            type="button"
            variant="outlined"
            color="light"
            disabled={current === 1}
            onClick={() => pageClickHandler(current - 1)}
          >
            Prev
          </XButton>
        </li>
        {pages.map((page) => (
          <li key={`page_${page.number}`} className="non">
            <XButton
              type="button"
              color={current === page.number ? 'primary' : 'light'}
              variant={current === page.number ? 'solid' : 'outlined'}
              onClick={() => pageClickHandler(page.number)}
            >
              {page.number}
            </XButton>
          </li>
        ))}
        <li>
          <XButton
            type="button"
            disabled={current === count}
            variant="outlined"
            color="light"
            onClick={() => pageClickHandler(current + 1)}
          >
            Next
          </XButton>
        </li>
      </ul>
    </nav>
  )
}
