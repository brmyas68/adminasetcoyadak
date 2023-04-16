import { Button } from 'antd'
import styled from 'styled-components'

interface IMainLayoutContainerProps {
  readonly background: string
}

export const MainLayoutContainer = styled.div<IMainLayoutContainerProps>`
  .ant-layout {
    background: #fafafa;
    padding-top: 0;
    margin-top: 0;
  }

  .layout-content {
    min-height: 100vh;
    background: ${props => `url(${props.background})`};
    background-repeat: no-repeat;
    background-origin: content-box;
    background-position: center;
    background-size: cover;
  }
`

export const HeaderMobileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
  padding: 1rem;
  width: 100%;
  height: 76px;
  background: #f2f2f2;
  /* border-radius: 16px 16px 0px 0px; */
`

export const AvatarIcon = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 8px;
  width: 44px;
  height: 44px;
  background: #fafafa;
  box-shadow: 0px 2px 60px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  border: none;
`
