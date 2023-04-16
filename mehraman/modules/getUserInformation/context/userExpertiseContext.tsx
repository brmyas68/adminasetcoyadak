import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { message } from 'antd'
import { useUnauthorizedLogOut } from 'hooks/logOut'
import { useGetUserInformationServicesCtx } from 'pages/get-user-information/context'
import { ICBodyLanguage, ICSystemRole } from 'package-mehraman-core'
import { useGetUserInformationDataCtx } from 'modules/getUserInformation/context'
import { RequestMessages } from 'modules/getUserInformation/models/enum'
import { Routes } from 'models/enums'
import { useLoading } from 'hooks/useLoading'

interface IContextValue {
  userExpertiseStates: { allRoles: ICSystemRole[] | undefined; hasRole: 'loading' | 'hasRole' | 'noRole'; userRole: number }
  userExpertiseHandlers: {}
  userExpertiseRequests: {
    addRoleRequest: (roleID: number) => Promise<void>
  }
}

export const UserExpertiseData = createContext<IContextValue | undefined>(undefined)

export const UserExpertiseDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [allRoles, setAllRoles] = useState<ICSystemRole[] | undefined>([])
  const [hasRole, setHasRoleState] = useState<'loading' | 'hasRole' | 'noRole'>('loading')
  const [userRole, setUserRole] = useState<number>(0)

  const { handlers } = useGetUserInformationDataCtx()
  const { setLoading } = useLoading()
  const services = useGetUserInformationServicesCtx()

  const { unauthorizedLogOut } = useUnauthorizedLogOut()

  const handleGetRoleSystem = useCallback(() => {
    setLoading(true)
    const requestBody: ICBodyLanguage = {
      lang_ID: 1,
    }
    services.userServices
      .GetAllRole(requestBody)
      .then(res => {
        if (res.data) {
          setAllRoles(res.data?.roles)
          if (res.data.userRole) {
            setUserRole(res.data.userRole || 0)
            const tagName = res.data.roles?.find(role => role.rol_ID === res.data?.userRole)?.rol_TagName
            const roleTitle = res.data.roles?.find(role => role.rol_ID === res.data?.userRole)?.transTagText
            handlers.setUserRoleTitle(roleTitle || '')
            handlers.setUserRoleTag(tagName || '')
            setHasRoleState('hasRole')
          } else if (res.data.roles) {
            setHasRoleState('noRole')
          } else {
            unauthorizedLogOut(Routes.Login)
          }
        } else {
          unauthorizedLogOut(Routes.Login)
        }
      })
      .catch(() => message.error('خطا در ارتباط با سرور'))
      .finally(() => setLoading(false))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (services && services.userServices) {
      handleGetRoleSystem()
    }
  }, [handleGetRoleSystem, services])

  //REQUEST
  const addRoleRequest = async (roleID: number) => {
    if (!services) return
    handlers.toggleLoadingHandler()

    try {
      const data = await services.userServices.InsertUserRole({ Role_ID: roleID })
      if (data.message === RequestMessages.Sucess) {
        message.success('تخصص شما باموفقیت ثبت گردید')
        const tagName = allRoles?.find(role => role.rol_ID === roleID)?.rol_TagName
        const roleTitle = allRoles?.find(role => role.rol_ID === roleID)?.transTagText
        handlers.setUserRoleTitle(roleTitle || '')
        handlers.setUserRoleTag(tagName || '')
        handlers.stepHandler(3)
      } else if (data.message === RequestMessages.RequestFailt) {
        message.error('خطا در ثبت تخصص')
      } else if (data.message === RequestMessages.NotAccess || data.message === RequestMessages.NotFoundUser) {
        unauthorizedLogOut(Routes.Home)
      } else {
        message.error('خطا در ثبت تخصص')
      }
    } catch {
      message.error('خطا در ارتباط  با سرور')
    } finally {
      handlers.toggleLoadingHandler()
    }
  }

  const ctxValue: IContextValue = {
    userExpertiseStates: { allRoles, hasRole, userRole },
    userExpertiseHandlers: {},
    userExpertiseRequests: {
      addRoleRequest,
    },
  }

  return <UserExpertiseData.Provider value={ctxValue}>{children}</UserExpertiseData.Provider>
}

export const useUserExpertiseData = () => useContext(UserExpertiseData)!
