import type { SwitchProps } from 'antd'
import { Switch } from 'antd'

type XToggleProps = SwitchProps & {}

export const XToggle = ({ ...props }: XToggleProps) => {
  return <Switch {...props} />
}
