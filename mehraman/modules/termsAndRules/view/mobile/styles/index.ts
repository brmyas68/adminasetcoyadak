import styled from 'styled-components'

export const MobileViewContainer = styled.div`
  padding: 16px 5px;
  margin: 5rem 1rem;
  background: #f2f2f2;
  border-radius: 16px 16px 0px 0px;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    align-items: center;
  }
  .content {
    background: #f2f2f2;
    height: 73.5vh;

    .typography {
      margin: 32px 16px 0 16px;
      background: #ffffff;
      padding: 24px 16px 0 16px;
      white-space: pre-line;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
    }
    .paragraph {
      text-align: justify;
    }
  }
  .mehraman {
    margin-right: 4px;
    color: ${props => props.theme.colors.blueLight};
  }
  .text {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 41px;
    text-align: right;
  }

  .backBtn {
    height: 44px;
    width: 44px;
    border-radius: 8px;
    padding: 8px;
    background: #fff;
    border: none;

    .icon {
      font-weight: 600;
      font-size: 19px;
    }
  }

  @media only screen and (max-width: 992px) {
    .content {
      height: calc(100vh - 115px);
    }
  }
`
