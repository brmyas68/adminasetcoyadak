import styled from 'styled-components'

export const FormLogoStyle = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: baseline;
  width: 100%;
  margin-bottom: 30px;
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

  .mehraman-word {
    color: ${props => props.theme.colors.blueLight};
  }
`
