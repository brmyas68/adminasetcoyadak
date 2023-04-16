import { breakPointScreen } from 'constants/breakPointScreen'
import { Button } from 'antd'
import styled from 'styled-components'

export const ButtonContainer = styled(Button)`
  display: none;
  z-index: 10;
  position: absolute;
  left: 20px;
  top: 21px;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 8px;
  width: 44px;
  height: 44px;
  background: #fefefe;
  box-shadow: 0px 2px 2px rgba(185, 187, 194, 0.43);
  border-radius: 8px;

  span {
    font-size: 16px;
    text-align: right;
    color: #1e1926;
    font-weight: 500;
  }
  .icon {
    font-size: 24px;
  }
  @media only screen and (max-width: 992px) {
    &&.showButton {
      display: flex;
    }
  }

  @media only screen and (max-width: ${breakPointScreen}px) {
    display: flex;
  }
`
