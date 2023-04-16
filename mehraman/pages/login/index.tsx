import React, { useCallback, useEffect, useState } from 'react'
import { NextPage } from 'next'
import LoginServicesProvider from './context'
import { LoginDataProvider } from 'modules/login/context'
import { LoginDesktop } from 'modules/login/view/desktop'
import LoginMobile from 'modules/login/view/mobile'
import UseCheckScreen from 'components/custom/useCheckScreen'
import { useRouter } from 'next/router'
import { Messages, Register, Status } from 'package-mehraman-core'
import { useDispatch } from 'react-redux'
import { saveUser } from 'store/actions/global.action'
import { SavedUser } from 'store/interfaces/saved-user.interface'
import { UserStates } from 'modules/login/models/enums'
import { Routes } from 'models'
import { Alert } from 'components/uiKit/Alert'
import { CLS_USER_INFO, CLS_USER_STATUS } from 'constants/localItem'
import { Spin } from 'antd'
import { useUserInfo } from 'hooks/userInfo'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const { userIsLogin } = useUserInfo()
  const query = router.query.token
  const dispatch = useDispatch()
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false)

  const checkToken = useCallback(
    async (token: string) => {
      const service = new Register(token)
      try {
        const result = await service.GetUserByToken()
        if (result.message !== Messages.Unauthorized) {
          const user: SavedUser = {
            accessToken: token,
            userStatus: UserStates.Continue,
            userInfo: result.data?.user,
            desc: result.data?.desc,
          }
          dispatch(saveUser(user))
          localStorage.setItem(CLS_USER_INFO, token)
          localStorage.setItem(CLS_USER_STATUS, UserStates.Continue)

          router.push(Routes.getUserInformation).then(() => {
            if (user.desc) {
              return Alert({ type: 'warning', message: 'اطلاعات ثبت شده شما نیاز به ویرایش دارد.' })
            }
          })
        } else {
          setShowLoginForm(true)
        }
      } catch (err) {
        setShowLoginForm(true)
      }
    },
    [dispatch, router],
  )
  useEffect(() => {
    if (query) {
      setShowLoginForm(false)

      checkToken(query as string)
    } else {
      setShowLoginForm(true)
    }
  }, [checkToken, query])

  if (!showLoginForm) {
    return (
      <div className="flex items-center justify-center w-[30vw] h-[80vh] bg-transparent mx-auto my-auto text-white" dir="rtl">
        لطفا صبر کنید...
        <Spin className="mr-2" />
      </div>
    )
  }

  if (userIsLogin) {
    router.push(Routes.Home)
    return <></>
  }

  return (
    <LoginServicesProvider>
      <LoginDataProvider>
        <UseCheckScreen DesktopComp={<LoginDesktop />} MobileComp={<LoginMobile />} />
      </LoginDataProvider>
    </LoginServicesProvider>
  )
}

export default LoginPage
