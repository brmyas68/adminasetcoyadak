import { breakPointScreen } from 'constants/breakPointScreen'
import styled from 'styled-components'

export const SpecializedInformationContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 24px;
  gap: 24px;
  max-width: 796px;
  width: 75%;
  min-height: 1091px;
  background: #ffffff;
  box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  .form-container {
    width: 100%;
    min-height: 860px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    padding: 32px;
    margin-bottom: 2rem;
  }

  .ant-col .ant-form-item-label {
    direction: ltr;
    text-align: right;

    label {
      font-weight: 500;
      font-size: 14px;
      color: #8c8c8c;
    }
  }

  .row-form {
    display: flex;
    align-items: flex-end;
  }

  @media only screen and (max-width: ${breakPointScreen}px) {
    padding: 32px 16px;
    width: 95%;

    .form-container {
      padding: 32px 20px;
    }
  }
`

export const SpecializedInformationTitle = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  height: 55px;

  .header-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
  }

  .text-role {
    padding: 4px 12px;
    height: 32px;
    border: 1px solid #7fb8e9;
    border-radius: 6px;
    color: #7fb8e9;
    cursor: default;
  }

  @media only screen and (max-width: ${breakPointScreen}px) {
    text-align: right;
  }
`

export const UploadFormItemContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 24px;
  gap: 14px;
  width: 100%;
  min-height: 189px;
  border-bottom: 1px solid #f0f0f0;
  @media only screen and (max-width: ${breakPointScreen}px) {
    overflow-x: scroll;
  }
`

export const FormItemLabelContainer = styled.span`
  .titleLabel {
    color: ${props => props.theme.colors.danger};
  }

  .subtitleLabel {
    font-size: 12px;
    color: #bfbfbf;
  }
`
