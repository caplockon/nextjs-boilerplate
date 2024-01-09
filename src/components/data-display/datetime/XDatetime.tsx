import type { DateTimeFormatOptions } from 'use-intl'

export type XDatetimeProps = {
  value: any
  formatOrOptions?: DateTimeFormatOptions | string
}
export const XDatetime = (props: XDatetimeProps) => {
  return <div />
  // const format = useFormatter()
  //
  // let instance: Date
  // if (typeof props.value === 'string') {
  //   instance = new Date(props.value)
  // } else if (typeof props.value === 'number') {
  //   instance = new Date()
  //   instance.setTime(props.value)
  // } else {
  //   instance = props.value
  // }
  //
  // return format.dateTime(instance, props.formatOrOptions)
}
