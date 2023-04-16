import { Typography } from 'antd'
import { FC } from 'react'
import { DescriptionMobileLogin } from '../styles'

const { Title, Paragraph } = Typography

const DescriptionLoginMobile: FC<{ title: React.ReactNode; des: string }> = ({ title, des }) => {
  return (
    <DescriptionMobileLogin>
      <Title level={3}>{title}</Title>
      <Paragraph className="paragraph-login">{des}</Paragraph>
    </DescriptionMobileLogin>
  )
}

export default DescriptionLoginMobile
