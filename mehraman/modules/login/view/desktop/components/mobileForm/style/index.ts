import styled from 'styled-components'

export const MobileNumberFormStyle = styled.div`
  min-height: calc(100vh - 128px);
  .row {
    height: calc(100vh - 128px);
  }
  .formContainer {
    background-color: white;
    padding: 32px;
    opacity: 0.9;
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }
  .ant-form-item-label > label {
    text-align: right;
    display: block;

    font-weight: 500;
    font-size: 14px;
    color: #8c8c8c;
  }

  .submitDesktop {
    margin-top: 2rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 54px;
  }
`
