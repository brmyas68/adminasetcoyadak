import { Col, Row, Typography } from 'antd'
import { aboutArticles } from 'modules/aboutUs/constants/aboutArticle'
import React from 'react'
import AboutDescArticle from '../desktop/components/description/components/AboutDescArticle'
import AboutMobileHeder from './components/AboutMobileHeder'
import { AboutUsMobileContainer } from './styles'

const AboutUsMobile = () => {
  return (
    <AboutUsMobileContainer>
      <Row dir="rtl">
        <Col span={24} className="header">
          <AboutMobileHeder />
        </Col>
        <Col span={24} className="content">
          {aboutArticles.map((article, index) => (
            <AboutDescArticle key={index} desc={article.desc} title={article.title} index={index + 1} />
          ))}
        </Col>
      </Row>
    </AboutUsMobileContainer>
  )
}

export default AboutUsMobile
