import { FC } from 'react'
import { Col, Row } from 'antd'
import { HomeContainer } from './styles'

export const HomePageMobile: FC = () => {
  return (
    <HomeContainer>
      <Row align="middle" justify="center">
        <Col md={12}>
          <div>صفحه اصلی مهرامن</div>
        </Col>
      </Row>
    </HomeContainer>
  )
}
