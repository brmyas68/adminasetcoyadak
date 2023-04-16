import { FC } from 'react'
import { FooterWarper } from '../styles'
import { Col, Row } from 'antd'
import { Footer } from 'antd/lib/layout/layout'
import { enamad, samandehi } from 'public/assets/images/common/logo'

export const MainFooter: FC = () => {
  return (
    <FooterWarper>
      <Footer className="footer">
        <Row align="middle">
          <Col xs={{ span: 12, order: 1 }} sm={{ span: 4, order: 1 }} className={'enamadLogos '}>
            <div>{enamad}</div>
            <div>{samandehi}</div>
          </Col>

          <Col xs={{ span: 24, order: 3 }} sm={{ span: 16, order: 2 }} dir="rtl">
            <div className="termsAndRules">
              {'  ©کپی رایت تمامی حقوق مادی و معنوی این سامانه متعلق به مجموعه  '} <strong className="companyName">مهرامن</strong>
              {' است. '}
            </div>
          </Col>
          <Col xs={{ span: 12, order: 2 }} sm={{ span: 0 }} md={4}></Col>
        </Row>
      </Footer>
    </FooterWarper>
  )
}
