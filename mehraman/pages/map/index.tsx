import { FC, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
import { usersSelector } from 'store/selectors'
import { UserStates } from 'modules/login/models/enums'
import { useRouter } from 'next/router'
import { Routes } from 'models'

const Map: FC = () => {
  const user = useSelector(usersSelector)
  const router = useRouter()
  const MehramanApp = dynamic(() => import('modules/map'), { ssr: false })
  useEffect(() => {
    if (user.userStatus && user.userStatus !== UserStates.Active) {
      router.replace(Routes.getUserInformation)
    }
  }, [router, user.userStatus])
  if (!user.accessToken || user.userStatus !== UserStates.Active) {
    return <></>
  }
  return <MehramanApp />
}
export default Map
