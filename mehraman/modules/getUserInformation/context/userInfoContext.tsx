import { createContext, Dispatch, FC, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'
import { message } from 'antd'
import { useUnauthorizedLogOut } from 'hooks/logOut'
import { useGetUserInformationServicesCtx } from 'pages/get-user-information/context'
import { RequestMessages } from 'modules/getUserInformation/models/enum'
import { Routes } from 'models/enums'
import { IOption } from 'components/uiKit/select/models/interfaces'
import { useGetUserInformationDataCtx } from 'modules/getUserInformation/context'
import { IUserInfo } from '../models'
import { useLoading } from 'hooks/useLoading'
import { Alert } from 'components/uiKit/Alert'

interface IContextValue {
  userInfoStates: {
    fetchDataLoading: boolean
    userInfo: IUserInfo | undefined
    provinces: IOption[]
    cities: IOption[]
    selectCityDisable: boolean
  }
  userInfoHandlers: {
    setSelectCityDisable: Dispatch<SetStateAction<boolean>>
  }
  userInfoRequests: {
    updateUserRequest: (info: IUserInfo) => Promise<void>
    getCityByProvinceId: (id: number) => void
  }
}

export const UserInformationData = createContext<IContextValue | undefined>(undefined)

export const UserInformationDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined)
  const [fetchDataLoading, setFetchDataLoading] = useState<boolean>(true)
  const [provinces, setProvinces] = useState<IOption[]>([])
  const [cities, setCities] = useState<IOption[]>([])
  const [selectCityDisable, setSelectCityDisable] = useState<boolean>(true)

  const services = useGetUserInformationServicesCtx()
  const { handlers } = useGetUserInformationDataCtx()
  const { setLoading } = useLoading()
  const { unauthorizedLogOut } = useUnauthorizedLogOut()

  const handleGetUserInfo = useCallback(() => {
    if (!services) return
    setLoading(true)
    services.userServices
      .GetUserByToken()
      .then(res => {
        if (res.data && res.data.user) {
          if (res.data.desc?.replaceAll('\n', '').replaceAll('\r', '')) Alert({ type: 'warning', message: res.data.desc })
          if (res.data.user.usr_Prov_ID > 0) getCityByProvinceId(res.data.user.usr_Prov_ID)
          setUserInfo({
            usr_Cty_ID: res.data.user.usr_Cty_ID!,
            usr_FName: res.data.user.usr_FName,
            usr_IdentNum: res.data.user.usr_IdentNum,
            usr_LName: res.data.user.usr_LName,
            usr_Mobile: res.data.user.usr_Mobile || '',
            usr_PostCode: res.data.user.usr_PostCode || '',
            usr_Prov_ID: res.data.user.usr_Prov_ID!,
            usr_ShabaNum: res.data.user.usr_ShabaNum || '',
            usr_Tell: res.data.user.usr_Tell || '',
            usr_Mail: res.data.user.usr_mail || '',
            usr_Gender: res.data.user.usr_Gender,
          })
          setLoading(false)
        } else if (
          res.message === RequestMessages.NotAccess ||
          res.message === RequestMessages.NotFoundUser ||
          res.message === RequestMessages.Unauthorized
        ) {
          unauthorizedLogOut(Routes.Login)
        } else {
          message.error('خطا در   دریافت اطلاعات')
        }
      })
      .catch(() => message.error('خطا در ارتباط با سرور'))
      .finally(() => setFetchDataLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services])

  const handleGetAllProvince = useCallback(() => {
    services.commonServices
      .GetAllProvince()
      .then(res => {
        if (res && res.data) {
          if (res.data.provinces) {
            const provinceOptions: IOption[] = res.data.provinces.map(province => ({
              label: province.provi_Name,
              value: province.provi_ID!,
            }))
            setProvinces(provinceOptions)
          }
        }
      })
      .catch(() => message.error('خطا در ارتباط با سرور'))
  }, [services])

  useEffect(() => {
    if (services) {
      handleGetUserInfo()
      handleGetAllProvince()
    }
  }, [handleGetAllProvince, handleGetUserInfo, services])

  //REQUEST
  const updateUserRequest = async (info: IUserInfo) => {
    if (!services) return
    handlers.toggleLoadingHandler()

    try {
      const data = await services.userServices.UpdateUser(info)
      if (data.message === RequestMessages.Sucess) {
        message.success('ثبت مشخصات با موفقیت انجام شد')
        setUserInfo(prev => ({ ...prev, ...info }))
        handlers.stepHandler(2)
      } else if (data.message === RequestMessages.RequestFailt) {
        message.error('خطا در ثبت مشخصات')
      } else if (data.message === RequestMessages.NotAccess || data.message === RequestMessages.NotFoundUser) {
        unauthorizedLogOut(Routes.Home)
      } else {
        message.error('خطا در ثبت مشخصات')
      }
    } catch {
      message.error('خطا در ارتباط با سرور')
    } finally {
      handlers.toggleLoadingHandler()
    }
  }

  const getCityByProvinceId = (id: number) => {
    services.commonServices
      .GetByProvinceID({ Prvice_ID: id })
      .then(res => {
        if (res && res.data) {
          if (res.data.cities) {
            setCities(res.data.cities.map(city => ({ label: city.cty_Name, value: city.cty_ID! })))
            setSelectCityDisable(false)
          }
        }
      })
      .catch(() => message.error('خطا در ارتباط با سرور'))
  }

  const ctxValue: IContextValue = {
    userInfoStates: { fetchDataLoading, userInfo, provinces, cities, selectCityDisable },
    userInfoHandlers: { setSelectCityDisable },
    userInfoRequests: {
      updateUserRequest,
      getCityByProvinceId,
    },
  }

  return <UserInformationData.Provider value={ctxValue}>{children}</UserInformationData.Provider>
}

export const useUserInformationData = () => useContext(UserInformationData)!
