import styled from 'styled-components'
import globalTheme from 'styles/globalThem'

export const AlertContainer = styled.div`
  border-radius: 8px;
  width: 300px;
  background: #fff;
  box-shadow: -1px 3px 46px -25px;
  padding: 15px;
  .typography {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .error {
    color: ${globalTheme.colors.danger};
  }
  .warning {
    color: ${globalTheme.colors.warning};
  }
  .info {
    color: ${globalTheme.colors.blueLight};
  }
  .success {
    color: ${globalTheme.colors.success};
  }
  .icon {
    margin-top: 20px;
  }
  .title {
    margin-top: 16px;
  }
  .message {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    text-align: center;
    color: ${globalTheme.colors.darkText};
  }
  .closeButton {
    display: block !important;
    margin: 12px;
    width: calc(100% - 24px);
    border-radius: 4px !important;
  }

  .ant-btn-link {
    background: none !important;
  }
`
