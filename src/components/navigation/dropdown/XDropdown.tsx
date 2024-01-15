'use client'

import { ClickAwayListener } from '@mui/base'
import clsx from 'clsx'
import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'

export type XDropdownProps = PropsWithChildren & {
  label?: string | React.ReactNode
}

export const XDropdown = ({ label, children }: XDropdownProps) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="relative overflow-visible">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <span onClick={handleClick}>{label}</span>

        <div
          className={clsx(
            'absolute right-0 top-full z-10 divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white shadow dark:bg-gray-700',
            {
              hidden: !open,
              visible: open,
            }
          )}
        >
          {children}
        </div>
      </div>
    </ClickAwayListener>
  )
}
