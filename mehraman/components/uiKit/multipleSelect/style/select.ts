import styled from 'styled-components'

export const SelectStyle = styled.div`
  .ant-select-selector,
  .ant-select-open .ant-select-selector,
  .ant-input {
    border: none !important;
    background: transparent !important;
    border-bottom: 1px solid #d9d9d9 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }

  .ant-select-selection-placeholder {
    padding-right: 0 !important;
  }

  .ant-select-selection-item {
    padding-right: 0 !important;
  }

  .ant-select-arrow {
    right: initial;
    left: 10px;
  }
  .ant-select-clear {
    right: initial !important;
    left: 29px !important;
    top: 14px;
  }
  .ant-select-focused {
    border: none;
  }

  .ant-checkbox-inner {
    display: none;
  }
`
