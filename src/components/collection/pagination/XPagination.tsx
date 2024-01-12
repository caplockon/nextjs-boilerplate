'use client'

import clsx from 'clsx'
import { useState } from 'react'

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
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            type="button"
            onClick={() => pageClickHandler(current - 1)}
            className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Prev
          </button>
        </li>
        {pages.map((page) => (
          <li key={`page_${page.number}`} className="non">
            <button
              type="button"
              className={clsx(
                'flex h-8 items-center justify-center border border-gray-300 px-3 leading-tight dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                {
                  'hover:bg-gray-100 hover:text-gray-700 text-gray-500 bg-white':
                    current !== page.number,
                  'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700':
                    current === page.number,
                }
              )}
              color={current === page.number ? 'primary' : 'light'}
              onClick={() => pageClickHandler(page.number)}
            >
              {page.number}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            disabled={current === count}
            className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            color="light"
            onClick={() => pageClickHandler(current + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}
