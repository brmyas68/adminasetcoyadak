import styled from 'styled-components'

export const AboutUsMobileContainer = styled.div`
  margin: 5rem 1rem 1rem 1rem;
  padding: 10px 16px 0 16px;
  background: #f2f2f2;
  border-radius: 16px 16px 0px 0px;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    align-items: center;
  }
  .content {
    height: 100%;
    padding: 1px 16px 0 16px;
    background: #ffffff;

    .ant-typography {
      text-align: justify;
    }
  }

  .header-title {
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
`
