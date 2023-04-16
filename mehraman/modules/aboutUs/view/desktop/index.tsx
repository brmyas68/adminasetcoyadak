import { Col } from 'antd'
import React, { FC } from 'react'
import AboutBanner from './components/banner'
import AboutUsDescription from './components/description'
import { AboutContainer } from './styles'

const AboutUsDesktop: FC = () => {
  return (
    <AboutContainer gutter={[24, 0]}>
      <Col span={24} xl={14} className="gutter-row">
        <AboutUsDescription />
      </Col>
      <Col span={0} xl={10} className="gutter-row">
        <AboutBanner />
      </Col>
    </AboutContainer>
  )
}

export default AboutUsDesktop
