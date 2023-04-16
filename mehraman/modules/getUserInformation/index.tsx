import { FC, useEffect } from 'react'
import { Col, Row, Steps } from 'antd'
import RegistrationUserExpertise from './components/registerUserExpertise'
import { useGetUserInformationDataCtx, UserExpertiseDataProvider, UserInformationDataProvider } from 'modules/getUserInformation/context'
import { StepsStyle } from './styles'
import SpecializedInformation from './components/SpecializedInformation'
import UserPersonalInformationForm from './components/userPersonalInformation'
import { SpecializedInformationProvider } from './context/SpecializedInformation'
import { BackButton } from 'components/uiKit/backButton'
import { useRouter } from 'next/router'

const { Step } = Steps

const GetUserInformation: FC = () => {
  const { states } = useGetUserInformationDataCtx()
  const router = useRouter()

  const StepItems = [
    {
      title: 'اطلاعات شخصی',
      content: (
        <UserInformationDataProvider>
          <UserPersonalInformationForm />
        </UserInformationDataProvider>
      ),
    },
    {
      title: 'انتخاب تخصص',
      content: (
        <UserExpertiseDataProvider>
          <RegistrationUserExpertise />
        </UserExpertiseDataProvider>
      ),
    },
    {
      title: 'اطلاعات تخصصی',
      content: (
        <SpecializedInformationProvider>
          <SpecializedInformation />
        </SpecializedInformationProvider>
      ),
    },
  ]

  return (
    <>
      <BackButton onClick={() => router.back()} />

      <Row justify="center" align="middle">
        <Col xs={23} sm={23} md={18} lg={18} xl={15}>
          <StepsStyle dir="rtl" current={states.steps} responsive={false}>
            {StepItems.map((item, index) => (
              <Step
                key={index}
                title={item.title}
                className={`step-${states.steps} ${index + 1 === states.steps ? 'step-show' : 'step-hide'}`}
                icon={
                  <>
                    <div className={`${index + 1 === states.steps && 'active'} stepsIcon `}>
                      <span>{index + 1 >= states.steps ? index + 1 : '✓'}</span>
                    </div>
                  </>
                }
              />
            ))}
          </StepsStyle>
        </Col>
      </Row>

      <section>{StepItems[states.steps - 1].content}</section>
    </>
  )
}

export default GetUserInformation
