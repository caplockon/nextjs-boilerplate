import type { LayoutProps } from 'antd'
import { Layout } from 'antd'

export type XLayoutProps = LayoutProps
const { Sider, Header, Content } = Layout

export const XLayout = (props: XLayoutProps) => {
  return <Layout {...props} />
}

export const XHeader = Header
export const XSider = Sider
export const XContent = Content
