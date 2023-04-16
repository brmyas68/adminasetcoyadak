import { Input } from 'antd'
import styled from 'styled-components'

export const InputUiKitStyles = styled(Input)`
  padding: 13px 0px 13px 8px;
  width: 100%;
  height: 50px;
  border: none;
  background: transparent !important;
  border-bottom: 1px solid #d9d9d9;
  box-shadow: none;

  .ant-input-prefix > .material-icons {
    font-size: 18px;
    margin-left: 10px;
    color: #bfbfbf;
  }

  .ant-input {
    background: transparent;
  }
`
