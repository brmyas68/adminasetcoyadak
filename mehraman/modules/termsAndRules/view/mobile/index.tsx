import { Col, Row, Typography } from 'antd'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { termsAndRules } from 'modules/termsAndRules/constant/TermsAndRulesText'
import { MobileViewContainer } from 'modules/termsAndRules/view/mobile/styles'
import { useRouter } from 'next/router'
import { FC } from 'react'

export const MobileTermsAndRules: FC = () => {
  const { Title, Paragraph } = Typography
  const router = useRouter()

  const back = () => router.back()

  return (
    <MobileViewContainer>
      <Row dir="rtl">
        <Col span={24} className="header">
          <div className="flex ">
            <h2 className="text">شرایط و قوانین </h2> <h1 className="text mehraman">مهرامن</h1>
          </div>
          <ButtonUiKit type="ghost" className="backBtn" onClick={back}>
            <span className="material-icons icon">west</span>
          </ButtonUiKit>
        </Col>
        <Col span={24} className="content">
          <Typography className="typography">
            <Title level={5} className="text-center">
              قوانین و مقررات استفاده و ثبت سفارش{' '}
            </Title>
            <Paragraph className="paragraph">{termsAndRules}</Paragraph>
          </Typography>
        </Col>
      </Row>
    </MobileViewContainer>
  )
}
