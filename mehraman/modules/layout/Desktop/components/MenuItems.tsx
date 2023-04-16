import { useEffect, useState } from 'react'
import { MenuProps } from 'antd'
import { Menu } from 'antd'
import { MenuContainer } from '../styles'
import { useMenuItems } from '../hook/useMenuItems'
import { useRouter } from 'next/router'
import { Routes } from 'models/enums'

// submenu keys of first level
const rootSubmenuKeys = ['/WornCars', '/ImportedCars']

export const HeaderMenu: React.FC = () => {
  const [current, setCurrent] = useState<string>('home')
  const [innerWidth, setInnerWidth] = useState<number>(0)
  const [openKeys, setOpenKeys] = useState<string[]>([''])
  const [menuTheme, setMenuTheme] = useState<'light' | 'dark'>('dark')

  const { menuItems } = useMenuItems(setOpenKeys)

  const router = useRouter()

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key)
  }

  useEffect(() => {
    setOpenKeys([])

    if (router.pathname === ' Routes.sellingWornCar ' || router.pathname === 'Routes.priceInquiry') {
      setCurrent('/WornCars')
    } else if (router.pathname === ' Routes.pImportedCars'.concat('/[importedCarID]')) {
      setCurrent('/products/imported-cars')
    } else if (router.pathname === 'Routes.pAutoParts'.concat('/[autoPartID]')) {
      setCurrent('/products/auto-parts')
    } else {
      setCurrent(router.pathname)
    }
  }, [router.pathname])

  const innerWidthHandler = () => {
    setInnerWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      innerWidthHandler()
    })
    return () => {
      window.removeEventListener('resize', () => {
        innerWidthHandler()
      })
    }
  }, [])

  useEffect(() => {
    if (innerWidth > 992) {
      setOpenKeys([])
    }
  }, [innerWidth])

  useEffect(() => {
    if (router.pathname === Routes.Login) {
      setMenuTheme('dark')
    } else {
      setMenuTheme('light')
    }
  }, [router.pathname])

  return (
    <>
      <MenuContainer>
        <Menu
          theme={menuTheme}
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={menuItems}
          triggerSubMenuAction={'click'}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          className="mainMenu"
        />
      </MenuContainer>
    </>
  )
}
