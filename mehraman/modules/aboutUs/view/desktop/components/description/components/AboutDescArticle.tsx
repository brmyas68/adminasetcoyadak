import { Typography } from 'antd'
import React, { FC } from 'react'
import { IAboutArticleProps } from '../interfaces/IArticleProps'
import { AboutDescArticleBox } from '../styles/aboutArticle'

const { Paragraph, Title } = Typography

const AboutDescArticle: FC<IAboutArticleProps> = ({ title, index, desc }) => {
  return (
    <AboutDescArticleBox dir="rtl">
      <Title level={5}>
        {index} - {title}
      </Title>

      <Paragraph className="article__paragraph">{desc}</Paragraph>
    </AboutDescArticleBox>
  )
}

export default AboutDescArticle
