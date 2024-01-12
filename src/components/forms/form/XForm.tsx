import { Formik, useFormik } from 'formik'
import { get } from 'lodash'

export const useFormError = (form: any) => {
  return <T = string | number | any,>(field: string): T => {
    return get(form, `errors.${field}`) && get(form, `touched.${field}`)
      ? get(form, `errors.${field}`)
      : undefined
  }
}

export { useFormik as useForm, Formik as XForm }
