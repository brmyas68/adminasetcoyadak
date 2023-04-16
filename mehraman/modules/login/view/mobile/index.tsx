import { useLoginDataCtx } from 'modules/login/context'
import { LoginSteps } from 'modules/login/models/enums'
import React, { FC } from 'react'
import MobileForm from './components/mobileForm'
import SendCodeForm from './components/codeForm'
import TermsAndRules from '../../../../components/custom/TermsAndRulesText'
import { LoginMobileBox, LoginMobileForm } from './styles'

const LoginMobile: FC = () => {
  const { states } = useLoginDataCtx()
  const { step } = states

  return (
    <>
      <LoginMobileBox>
        <LoginMobileForm>{step === LoginSteps.mobile ? <MobileForm /> : <SendCodeForm />}</LoginMobileForm>
      </LoginMobileBox>
      <TermsAndRules />
    </>
  )
}

export default LoginMobile
