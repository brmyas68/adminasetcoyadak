import { Button } from 'antd'
import styled from 'styled-components'
import globalTheme from 'styles/globalThem'

export const ButtonContainer = styled(Button)`
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 0px 2px 60px rgba(0, 0, 0, 0.05);
  &.ant-btn-primary {
    background: ${globalTheme.colors.blueLight};
    border-color: ${globalTheme.colors.blueLight};
  }
  &.ant-btn-primary:hover {
    transform: scale(0.97);
  }
  &.ant-btn-primary[disabled] {
    color: #fff;
    background: #78bcf7;
    border: #78bcf7;
  }
  &.success {
    padding: 4px 8px;
    gap: 8px;
    /* success */
    color: #fff;
    background: #00b499;
    border-radius: 4px;
    /* Inside auto layout */
  }
  &.ghost {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    gap: 8px;
    color: #b9bbc2;
    border: 1px solid #b9bbc2;
    border-radius: 8px;
    transition: 0.3s;
  }
  &.ghost:hover {
    color: #7fb8e9;
    border: 1px solid #7fb8e9;
  }
  .material-icons {
    font-size: 18px;
  }
`
