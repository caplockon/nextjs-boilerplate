import type { FormItemProps } from 'antd'
import { Form } from 'antd'

type XFormItemProps<T> = FormItemProps<T> & {}

export const XFormItem = <T = any,>({ ...props }: XFormItemProps<T>) => {
  return <Form.Item<T> {...props} />
}
