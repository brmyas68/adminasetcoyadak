import { FC, ReactNode, useEffect, useState } from 'react'
import { Layout } from 'antd'
import { MainLayoutContainer } from './styles'
import { MainHeader } from './components/header'
import { MainFooter } from './components/footer'
import { useRouter } from 'next/router'
import { Routes } from 'models/enums'

interface IMainLayoutProps {
  children: ReactNode
}
export const DesktopMainLayout: FC<IMainLayoutProps> = ({ children }) => {
  const [backUrl, setBackUrl] = useState<string>('')

  const route = useRouter()
  const { Content } = Layout
  useEffect(() => {
    switch (route.route) {
      case Routes.Login:
        setBackUrl('/assets/images/login/backgroundLogin.jpg')
        break

      default:
        setBackUrl('/assets/images/common/background.svg')
        break
    }
  }, [route])
  return (
    <MainLayoutContainer background={backUrl}>
      <Layout>
        <div className="headerContentStyle">
          <MainHeader />
          <Content className="layout-content">{children}</Content>
        </div>
        <MainFooter />
      </Layout>
    </MainLayoutContainer>
  )
}
