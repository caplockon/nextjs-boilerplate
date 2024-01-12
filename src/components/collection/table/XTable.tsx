import clsx from 'clsx'
import { get as getValue } from 'lodash'
import React, { forwardRef } from 'react'

export type XTableColumn<T> = {
  name: string
  label?: string
  render?: (record: T) => any
  cellClass?: string
  theadClass?: string
}

export type XTableProps<T = any> = {
  className?: string
  columns?: XTableColumn<T>[]
  dataSource?: T[]
  recordKey?: (record: T) => string | number
  border?: boolean
}

function render<T>(record: T, column: XTableColumn<T>) {
  if (column.render) {
    return column.render(record)
  }

  return getValue(record, column.name)
}

export const XTable = forwardRef<HTMLTableElement, XTableProps>(
  (props, ref) => {
    const {
      className,
      columns = [],
      dataSource = [],
      recordKey = (record) => getValue(record, 'key'),
      border = false,
      ...others
    } = props

    return (
      <div className="relative overflow-x-auto">
        <table
          className={clsx(
            className,
            'w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400',
            { 'table-bordered': border }
          )}
          {...others}
          ref={ref}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.name}
                  scope="col"
                  className={clsx('px-6 py-2', column.theadClass)}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          {dataSource.length > 0 && (
            <tbody>
              {dataSource?.map((record) => {
                return (
                  <tr key={recordKey(record)}>
                    {columns.map((column) => (
                      <td
                        key={`${record.key}_${column.name}`}
                        className={clsx(column.cellClass, 'px-6 py-2')}
                      >
                        {render(record, column)}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          )}
        </table>
      </div>
    )
  }
)

XTable.displayName = 'XTable'
