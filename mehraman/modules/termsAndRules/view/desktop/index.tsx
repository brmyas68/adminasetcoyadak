import { Col, Typography } from 'antd'
import { termsAndRules } from 'modules/termsAndRules/constant/TermsAndRulesText'
import Image from 'next/image'
import { FC } from 'react'
import { DesktopTermsAndRulesContainer } from './styles'

export const DesktopTermsAndRules: FC = () => {
  const { Title, Paragraph } = Typography
  return (
    <DesktopTermsAndRulesContainer dir="rtl">
      <Col span={24} className="imageHolder">
        <Image src={'/assets/images/TermsAndRules-bg.jpg'} alt="TermsAndRules" width={1440} height={608} />
      </Col>
      <Col span={24} className="content">
        <Typography className="typography">
          <Title level={4} className="text-center">
            قوانین و مقررات استفاده و ثبت سفارش{' '}
          </Title>
          <Paragraph className="paragraph">{termsAndRules}</Paragraph>
        </Typography>
      </Col>
    </DesktopTermsAndRulesContainer>
  )
}
