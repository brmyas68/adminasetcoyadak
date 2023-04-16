import { Row } from 'antd'
import styled from 'styled-components'

export const DesktopTermsAndRulesContainer = styled(Row)`
  .imageHolder {
    display: flex;
    justify-content: center;
  }
  .paragraph {
    text-align: justify;
  }
  .typography {
    max-width: 1440px;
    align-items: center;
    margin-right: auto;
    margin-left: auto;
    padding: 32px 154px;
    white-space: pre-line;
    font-style: normal;
    font-weight: 700;
    line-height: 55px;
  }
  @media only screen and (min-width: 1600px) {
    .typography {
      padding-left: 0;
      padding-right: 0;
    }
  }
`
