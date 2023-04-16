import UseCheckScreen from 'components/custom/useCheckScreen'
import { useLogOut } from 'hooks/logOut'
import React from 'react'
import { AvatarIcon, HeaderMobileContainer } from '../styles'

const HeaderMobile = () => {
  const { logOut } = useLogOut()

  return (
    <UseCheckScreen
      DesktopComp={<></>}
      MobileComp={
        <HeaderMobileContainer>
          <AvatarIcon onClick={() => logOut()}>
            <span className="material-icons profile-icon">logout</span>
          </AvatarIcon>
        </HeaderMobileContainer>
      }
    />
  )
}

export default HeaderMobile
