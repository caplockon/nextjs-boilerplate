import type { FormInstance, FormProps } from 'antd'
import { Form } from 'antd'
import type { ReactNode } from 'react'

type XFormProps = FormProps & {
  children: ReactNode
}

type XFormInstance<T> = FormInstance<T> & {}

export const XForm = ({ ...props }: XFormProps) => {
  const { children } = props
  return <Form {...props}>{children}</Form>
}

export const useForm = <T = any,>(
  form?: XFormInstance<T>
): [FormInstance<T>] => {
  return Form.useForm(form)
}
