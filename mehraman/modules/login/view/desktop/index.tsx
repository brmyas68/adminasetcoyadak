import { FC } from 'react'
import { LoginSteps } from 'modules/login/models/enums'
import { useLoginDataCtx } from 'modules/login/context'
import ActiveCodeForm from './components/codeForm'
import MobileNumberForm from './components/mobileForm'

export const LoginDesktop: FC = () => {
  const { states } = useLoginDataCtx()
  const { step } = states

  return <>{step === LoginSteps.mobile ? <MobileNumberForm /> : <ActiveCodeForm />}</>
}
