import { FC, ReactNode } from 'react'
import { Layout } from 'antd'
import { MainLayoutContainer } from './styles'

import { Content } from 'antd/lib/layout/layout'

const bgUrl = '/assets/images/common/pattern.svg'

interface IMainLayoutProps {
  children: ReactNode
}
export const MobileMainLayout: FC<IMainLayoutProps> = ({ children }) => {
  return (
    <MainLayoutContainer background={bgUrl}>
      <Layout>
        <Content className="layout-content">{children}</Content>
      </Layout>
    </MainLayoutContainer>
  )
}
