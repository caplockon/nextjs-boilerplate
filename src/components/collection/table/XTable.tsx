import clsx from 'clsx'
import React, { forwardRef } from 'react'

export type XTableRecordType<T> = T & React.Key

export type XTableColumn<T> = {
  name?: string
  label?: string
  render?: (record: T) => any
}

export type XTableProps<T = any> = {
  className?: string
  columns?: XTableColumn<T>[]
  dataSource?: T[]
}

function render<T>(record: T, column: XTableColumn<T>) {
  if (column.render) {
    return column.render(record)
  }

  return ''
}

export const XTable = forwardRef<HTMLTableElement, XTableProps>(
  (props, ref) => {
    const { className, columns = [], dataSource = [], ...others } = props
    return (
      <div className="relative overflow-x-auto">
        <table
          className={clsx(
            className,
            'w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400'
          )}
          {...others}
          ref={ref}
        >
          <thead>
            {columns.map((column) => (
              <th key={column.name} scope="col" className="px-6 py-3">
                {column.label}
              </th>
            ))}
          </thead>

          <tbody>
            {dataSource.length > 0 &&
              dataSource.map((record) => {
                return (
                  <tr key={record.key}>
                    {columns.map((column) => (
                      <td key={`${record.key}_${column.name}`}>
                        {render(record, column)}
                      </td>
                    ))}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    )
  }
)

XTable.displayName = 'XTable'
