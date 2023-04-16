import { message } from 'antd'
import { Alert } from 'components/uiKit/Alert'
import { CLS_USER_INFO, CLS_USER_STATUS } from 'constants/localItem'
import { fixNumbers } from 'helper/fixNumber'
import { Routes } from 'models/enums'
import { useRouter } from 'next/router'
import { useLoginServicesCtx } from 'pages/login/context'
import { createContext, FC, ReactNode, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveUser } from 'store/actions/global.action'
import { usersSelector } from 'store/selectors'
import { LoginResultMessage, LoginSteps, UserStates } from '../models/enums'
import { EnterNumberLogin, StepsLogin } from './IProps'

const keyLoading = 'updatable'

interface IContextValue {
  states: {
    enterNumber: EnterNumberLogin
    step: StepsLogin
    loading: boolean
  }
  handlers: {
    setEnterNumberHandler: (toStep: StepsLogin, number?: EnterNumberLogin) => void
    toggleLoadingHandler: (loading: boolean) => void
  }
  requests: {
    sendActiveCodeReq: (number: number) => Promise<void>
    isValidCodeReq: (number: number, code: number) => Promise<void>
  }
}

export const LoginDataCtx = createContext<IContextValue | undefined>(undefined)
export type UserStatesType = UserStates
export const LoginDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const services = useLoginServicesCtx()

  const [enterNumber, setEnterNumber] = useState<EnterNumberLogin>()
  const [step, setStep] = useState<StepsLogin>(LoginSteps.mobile)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const user = useSelector(usersSelector)
  //HANDLER
  const setEnterNumberHandler = (toStep: StepsLogin, number?: EnterNumberLogin) => {
    number && setEnterNumber(number)
    setStep(toStep)
  }
  const toggleLoadingHandler = () => setLoading(prev => !prev)

  //REQUEST
  const sendActiveCodeReq = async (number: number) => {
    if (!services) return
    message.loading({ content: '...درحال ارسال کد', key: keyLoading })

    try {
      const result = await services.authServices.SendActiveCode({ receptorMobile: fixNumbers(number.toString()) })
      if (result.message === LoginResultMessage.IsBlockUser) {
        Alert({ type: 'error', message: 'متاسفانه حساب کاربری شما ، مسدود میباشد' })
        return
      }
      if (result?.status === 200) {
        setEnterNumberHandler(LoginSteps.sms, number)
        message.success({ content: 'کد تایید ارسال شد', key: keyLoading })

        if (result.data?.state) {
          dispatch(saveUser({ ...user, userStatus: result.data.state }))
          localStorage.setItem(CLS_USER_STATUS, result.data.state)
        }
        return
      }

      message.error({ content: 'خطا در ارسال کد تایید', key: keyLoading })
    } catch {
      message.error({ content: 'خطا در ارتباط با سرور', key: keyLoading })
    }
  }

  const isValidCodeReq = async (number: number, code: number) => {
    if (!services) return
    toggleLoadingHandler()

    try {
      const result = await services.authServices.IsValidActiveCode({
        receptorMobile: fixNumbers(number.toString()),
        activeCode: fixNumbers(code.toString()),
      })

      if (result.status === 200) {
        if (result.message === LoginResultMessage.IsBlockUser) {
          Alert({ type: 'error', message: 'متاسفانه حساب کاربری شما ، مسدود میباشد' })
          return
        }

        if (result.data?.state) {
          localStorage.setItem(CLS_USER_STATUS, result.data.state)
          switch (result.data?.state) {
            case UserStates.Inactive:
              return Alert({
                type: 'error',
                message: 'شما مجاز به ادامه فرآیند نیستید',
                onClick: () => {
                  setStep(LoginSteps.mobile)
                },
              })
            case UserStates.Pending:
              return Alert({
                type: 'info',
                message: 'اطلاعات ثبت شده شما توسط تیم مهرامن در حال بررسی است.',
                onClick: () => {
                  setStep(LoginSteps.mobile)
                },
              })

            case UserStates.Continue:
              if (result.data.token) {
                localStorage.setItem(CLS_USER_INFO, result.data.token)
                dispatch(saveUser({ ...user, accessToken: result.data.token }))
                router.push(Routes.getUserInformation)
                break
              }

            case UserStates.Active:
              if (result.data.token) {
                localStorage.setItem(CLS_USER_INFO, result.data.token)
                dispatch(saveUser({ ...user, accessToken: result.data.token }))
                router.push(Routes.map)
              }
              break
            default:
              return message.error('کد وارد شده صحیح نمیباشد')
          }
        }
      } else {
        message.error('کد وارد شده صحیح نمیباشد')
      }
    } catch {
      message.error('خطا در ارتباط با سرور')
    } finally {
      toggleLoadingHandler()
    }
  }

  const ctxValue: IContextValue = {
    states: {
      enterNumber,
      step,
      loading,
    },
    handlers: {
      setEnterNumberHandler,
      toggleLoadingHandler,
    },
    requests: {
      sendActiveCodeReq,
      isValidCodeReq,
    },
  }

  return <LoginDataCtx.Provider value={ctxValue}>{children}</LoginDataCtx.Provider>
}

export const useLoginDataCtx = () => useContext(LoginDataCtx)!
