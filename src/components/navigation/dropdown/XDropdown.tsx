import type { DropdownProps, MenuProps } from 'antd'
import { Dropdown } from 'antd'

export type XDropdownProps = DropdownProps & {}
export type XMenuProps = MenuProps & {}

export const XDropdown = (props: XDropdownProps) => {
  return <Dropdown {...props} />
}
