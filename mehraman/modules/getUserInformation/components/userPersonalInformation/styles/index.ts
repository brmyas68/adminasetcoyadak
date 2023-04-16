import styled from 'styled-components'

export const UserPersonalInformationFormContainer = styled.div<{ requiredDir: 'rtl' | 'ltr' }>`
  .formContainer {
    background-color: white;
    padding: 32px;
    opacity: 0.9;
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }
  .form {
    margin-top: 25px;
  }
  .userInfoFormRow {
    padding: 24px;
    border-radius: 8px;
    border: solid 1px rgba(0, 0, 0, 0.07);
  }
  .ant-form-item-label {
    text-align: right;
    direction: ${({ requiredDir }) => requiredDir};
  }
  .user-info-mobile-item .ant-form-item-control .ant-form-item-control-input {
    background-color: rgba(0, 0, 0, 0.05) !important;
  }

  .user-info-mobile-input {
    color: black;
    margin-right: 5px;
  }

  .user-info-gender-select {
    margin-top: 18px;
  }
`
