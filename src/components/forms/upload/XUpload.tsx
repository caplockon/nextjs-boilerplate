import { Upload, UploadProps } from 'antd';

export type XUploadProps = UploadProps & {}

export const XUpload = (props: XUploadProps) => {
  return <Upload {...props} />
}
