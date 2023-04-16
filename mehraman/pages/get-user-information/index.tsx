import { NextPage } from 'next'
import GetUserInformationServicesProvider from './context'
import GetUserInformation from 'modules/getUserInformation'
import HeaderMobile from 'modules/layout/mobile/components/Header'
import { GetUserInformationDataProvider } from 'modules/getUserInformation/context'

import { useSelector } from 'react-redux'
import { usersSelector } from 'store/selectors'
import { UserStates } from 'modules/login/models/enums'

const LoginPage: NextPage = () => {
  const user = useSelector(usersSelector)

  if (!user.accessToken || user.userStatus !== UserStates.Continue) return <></>
  return (
    <>
      <HeaderMobile />
      <GetUserInformationServicesProvider>
        <GetUserInformationDataProvider>
          <GetUserInformation />
        </GetUserInformationDataProvider>
      </GetUserInformationServicesProvider>
    </>
  )
}

export default LoginPage
