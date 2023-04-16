import { Typography } from 'antd'
import { FC } from 'react'
import { FormTitleContainer } from '../styles/FormTitleStyle'

const { Title, Paragraph } = Typography

const FormTitle: FC<{ title: React.ReactNode; des: React.ReactNode }> = ({ title, des }) => {
  return (
    <FormTitleContainer dir="rtl">
      <Title level={3} className="title">
        {title}
      </Title>
      <Paragraph className="description">{des}</Paragraph>
    </FormTitleContainer>
  )
}

export default FormTitle
