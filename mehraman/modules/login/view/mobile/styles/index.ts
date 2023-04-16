import styled from 'styled-components'

export const LoginMobileBox = styled.section`
  width: 100%;
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 1rem;

  .submitMobile {
    padding: 8px, 12px, 8px, 12px;
    border-radius: 12px;
    min-width: 155px;
    min-height: 40px;
    margin-right: auto;
    margin-top: 7rem;
  }
`

export const TermsAndRulesText = styled.section`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  color: ${props => props.theme.colors.darkText};

  .highlight {
    color: ${props => props.theme.colors.blueLight};
    text-decoration: underline;
    cursor: pointer;
  }
`

export const DescriptionMobileLogin = styled.section`
  text-align: right;
  margin-bottom: 3rem;
  .paragraph-login {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: ${props => props.theme.colors.darkText};
  }
`

export const LoginMobileForm = styled.section`
  .ant-form-item-label {
    text-align: right;
    label {
      font-weight: 500;
      font-size: 14px;
      color: ${props => props.theme.colors.darkGray};
    }
  }

  .next-btn {
    margin-top: 6rem;
    width: 155px;
    height: 40px;
  }

  .timer {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;

    .available {
      font-size: 12px;
      color: ${props => props.theme.colors.blueLight};
      padding: 0;
    }

    &_text {
      color: ${props => props.theme.colors.danger};
    }
  }
`

export const GetUserInfoButtonsContainer = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 12px;
  width: 100%;
  margin-top: 19px;
  .submit,
  .cancel {
    padding: 8px 16px;
    border-radius: 12px;
    flex-direction: row-reverse;
  }

  .submit {
    width: 130px;
    margin-right: 10px;
  }
  .cancel {
    background: #f2f2f2;
    color: black;
    width: 110px;
  }
`
