import { Typography } from 'antd'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { useRouter } from 'next/router'
import React from 'react'
const { Title } = Typography

const AboutMobileHeder = () => {
  const router = useRouter()

  return (
    <>
      <section className="flex">
        <Title className="header-title" level={2}>
          درباره ما
        </Title>
      </section>
      <ButtonUiKit type="ghost" className="backBtn" onClick={() => router.back()}>
        <span className="material-icons icon">west</span>
      </ButtonUiKit>
    </>
  )
}

export default AboutMobileHeder
