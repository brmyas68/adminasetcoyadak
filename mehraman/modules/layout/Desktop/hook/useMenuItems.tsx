import { MenuProps } from 'antd'
import { useUserInfo } from 'hooks/userInfo'
import { Routes } from 'models/enums'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'
import { useDispatch } from 'react-redux'

export const useMenuItems = (setOpenKeys: any) => {
  const dispatch = useDispatch()
  const { userIsLogin } = useUserInfo()
  const router = useRouter()

  const handleClickSumMenu = (e: MouseEvent<HTMLElement>, goTo: string) => {
    e.preventDefault()
    setOpenKeys([])
    router.push(goTo)
  }

  const menuItems: MenuProps['items'] = [
    {
      label: (
        <Link href={Routes.Home}>
          <a>خانه</a>
        </Link>
      ),

      key: `${Routes.Home}`,
      // onClick: () => {
      //   dispatch(carImagePositionAction(0))
      // },
    },
    {
      label: (
        <Link href={Routes.Blog}>
          <a>وبلاگ</a>
        </Link>
      ),
      key: `${Routes.Blog}`,
    },
    {
      label: (
        <Link href={Routes.Panel}>
          <a>پنل سازمانی</a>
        </Link>
      ),
      key: '/panel',
    },
    {
      label: (
        <Link href={Routes.About}>
          <a>درباره ما</a>
        </Link>
      ),
      key: '/about',
    },
    {
      label: (
        <Link href={Routes.Contact}>
          <a>تماس با ما</a>
        </Link>
      ),
      key: `${Routes.Contact}`,
    },
  ]

  return { menuItems }
}
