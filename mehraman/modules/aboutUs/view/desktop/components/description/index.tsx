import { Typography } from 'antd'
import { aboutArticles } from 'modules/aboutUs/constants/aboutArticle'
import React, { FC } from 'react'
import AboutDescArticle from './components/AboutDescArticle'
import { AboutUsDescriptionBox } from './styles'

const { Title } = Typography

const AboutUsDescription: FC = () => {
  return (
    <AboutUsDescriptionBox>
      <Title level={2} className="about__title">
        درباره ما
      </Title>

      {aboutArticles.map((article, index) => (
        <AboutDescArticle key={index} desc={article.desc} title={article.title} index={index + 1} />
      ))}
    </AboutUsDescriptionBox>
  )
}

export default AboutUsDescription
