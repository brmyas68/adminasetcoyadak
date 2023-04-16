import styled from 'styled-components'
import { Steps } from 'antd'

export const StepsStyle = styled(Steps)<{ dir: 'rtl' | 'ltr' }>`
  height: 72px;

  direction: ${({ dir }) => dir};
  margin-top: 25px;
  border-radius: 8px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  .description {
    font-size: 0.6rem;
  }
  .ant-steps-item {
    flex: none;
    overflow: unset;
    width: 190px;
  }
  .ant-steps-item-title {
    padding-right: 8px !important;
  }

  .ant-steps-item-title::after {
    right: 117px;
    width: 20px;
    top: 21px;
    background: #b9bbc2;
  }
  .ant-steps-item-content {
    vertical-align: unset;
  }
  .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
    background: #b9bbc2; //line
  }
  .stepsIcon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: #909195;
    border-radius: 20px;
    float: right;
    span {
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      text-align: right;
      color: #fff;
      font-family: IRANYekanFN;
    }
  }
  .active {
    background: #0059ff;
    span {
      color: #fff;
    }
  }

  @media only screen and (min-width: 1024px) and (max-width: 1300px) {
    .step-3 {
      transform: translateX(42px);
    }
    .step-4 {
      transform: translateX(0px);
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    .step-3 {
      transform: translateX(2px);
    }
    .step-4 {
      transform: translateX(220px);
    }
  }

  @media only screen and (max-width: 768px) {
    .step-show {
      transform: translateX(0px);
      margin: auto;
    }
    .step-hide {
      display: none;
    }
  }
`
