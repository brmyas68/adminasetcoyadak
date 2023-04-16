import { FC, useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useUserInfo } from 'hooks/userInfo'
import { Routes } from 'models/enums'
import { HeaderMenu } from './MenuItems'
import { HeaderWarper } from '../styles'
import { useLogOut } from 'hooks/logOut'

export const MainHeader: FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('')
  const [headerTransparent, setHeaderTransparent] = useState<boolean>(true)

  const { userIsLogin } = useUserInfo()
  const { logOut } = useLogOut()

  const router = useRouter()
  useEffect(() => {
    setCurrentPath(router.pathname)
    if (router.pathname === Routes.Login) {
      setHeaderTransparent(true)
    } else {
      setHeaderTransparent(false)
    }
  }, [router.pathname])

  return (
    <HeaderWarper headerTransparent={headerTransparent}>
      <Header className="header">
        <Row align="middle" justify={'end'} className="headerRowStyle">
          <Col xs={{ span: 3, order: 1 }} lg={{ span: 3, order: 1 }} className={'loginButton '}>
            <Row align="middle" justify="center" gutter={16} className="items-baseline-menu-item">
              <Col span={24}>
                {userIsLogin && (
                  <div className="profileContainer">
                    <div className="profile" onClick={() => logOut()}>
                      <span>خروج</span>
                      <span className="material-icons profile-icon">logout</span>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </Col>

          <Col xs={{ span: 18, order: 3 }} lg={{ span: 18, order: 3 }} dir="rtl" className="">
            <HeaderMenu />
          </Col>

          <Col xs={{ span: 3, order: 4 }} lg={{ span: 3, order: 4 }} className="logo ">
            <Link href={Routes.Home}>
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/assets/images/common/mehraman-logo-type.png" width="200px" height="16" alt="مهرامن" />
              }
            </Link>
          </Col>
        </Row>
      </Header>
    </HeaderWarper>
  )
}
