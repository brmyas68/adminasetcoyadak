import { breakPointScreen } from 'constants/breakPointScreen'
import { FC, ReactElement, useEffect } from 'react'
import { useMediaQuery } from '../../hooks/mediaQuery'
import { useLoading } from '../../hooks/useLoading'

interface IProps {
  DesktopComp: ReactElement
  MobileComp: ReactElement
}

const UseCheckScreen: FC<IProps> = ({ DesktopComp, MobileComp }) => {
  const { setLoading } = useLoading()
  const isDesktopScreen = useMediaQuery(breakPointScreen)

  useEffect(() => {
    // setTimeout(() => setLoading(false), 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktopScreen])

  switch (isDesktopScreen) {
    case false:
      return MobileComp

    default:
      return DesktopComp
  }
}

export default UseCheckScreen
