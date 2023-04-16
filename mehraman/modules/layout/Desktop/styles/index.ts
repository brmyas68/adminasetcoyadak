import styled from 'styled-components'

interface IMainLayoutContainerProps {
  readonly background: string
}

interface IHeaderWarperProps {
  headerTransparent: boolean
}

export const MainLayoutContainer = styled.div<IMainLayoutContainerProps>`
  .headerContentStyle {
    background: ${props => `url(${props.background})`};
    background-repeat: no-repeat;
    background-origin: content-box;
    background-position: center;
    background-size: cover;
  }

  .ant-layout {
    background: #fafafa;
    padding-top: 0;
    margin-top: 0;
  }
  .ant-menu-horizontal {
    border: unset;
  }
  .ant-layout-footer {
    background: #fafafa;
  }
  .layout-content {
    min-height: calc(100vh - 128px);
    /* padding: 24px; */
  }
`
export const HeaderWarper = styled.div<IHeaderWarperProps>`
  width: 100%;
  background: ${props => (props.headerTransparent ? `transparent !important` : `white !important`)};
  .header {
    background: transparent !important;
    padding: unset !important;
    margin: 0 15px !important;
    height: 64px;
    line-height: 64px;
  }
  .headerRowStyle {
    width: 100%;
    display: inline-flex;
    align-items: center;
  }
  .items-baseline-menu-item {
    align-items: baseline;
  }
  .logo {
    display: flex;
    align-items: center;
    img {
      cursor: pointer;
    }
  }
  .loginButton {
    display: flex;
    align-items: center;
    justify-content: start;
    padding-top: 14px;
  }
  .basket-active {
    border-bottom: solid 1px red;
    border-bottom: solid 2px ${props => props.theme.colors.blueLight};
    color: black;
  }
  .ant-row {
    line-height: 40px;
  }
  .ghost {
    height: 32px !important;
  }
  .header-dashboard-link-item {
    text-align: right !important;
    color: red !important;
    display: block !important;
  }
  .svg-arrow {
    z-index: 100;
  }
  .svg {
    position: relative;
    left: 5px;
  }
  .profileContainer {
    position: relative;
    bottom: 4px;
    cursor: pointer;
  }
  .profile {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 18px;
    border: 1px solid ${props => props.theme.colors.blueLight};
    border-radius: 12px;
    color: ${props => props.theme.colors.blueLight};
  }
  .profile-icon {
    margin-left: 10px;
  }
`
export const MenuContainer = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #1e1926;

  .ant-btn {
    background: none;
  }

  .ant-menu-root {
    display: flex;
    align-items: center;
    background: transparent;
    width: 100%;
    text-align: right !important;
    justify-content: center;
  }

  .ant-menu-horizontal > .ant-menu-item-selected a {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 28px;
    color: #1e1926 !important;
  }

  .ant-menu .ant-menu-item-selected,
  .ant-menu .ant-menu-item-selected .ant-menu-item-only-child {
    background-color: transparent;
  }
  .ant-menu .ant-menu-item-selected .ant-menu-title-content a {
    color: #1890ff !important;
  }
  .ant-menu .ant-menu-item-selected:hover,
  .ant-menu .ant-menu-item-only-child:hover {
    background-color: transparent;
  }
`
export const FooterWarper = styled.div`
  .termsAndRules {
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    color: #188aec;
  }
  .enamadLogos {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 16px;
  }
  .companyName {
    margin-left: 4px;
    margin-right: 4px;
    color: #dea512;
    font-size: 18px;
  }
  .ant-layout-footer {
    padding: 8px 24px;
  }

  @media only screen and (max-width: 1090px) {
    .termsAndRules {
      font-size: 18px;
    }
  }

  @media only screen and (max-width: 992px) {
    .termsAndRules {
      font-weight: 600;
      font-size: 15px;
      margin-top: 10px;
    }
    .companyName {
      margin-left: 0 0 0 1px;
    }
  }

  @media only screen and (max-width: 831px) {
    .termsAndRules {
      font-weight: 600;
      font-size: 11px;
      margin-top: 10px;
    }
    .companyName {
      margin-left: 0 0 0 1px;
    }
  }

  @media only screen and (max-width: 431px) {
    .termsAndRules {
      display: block;
      font-weight: 400;
      font-size: 11px;
      text-align: center;
    }
    .companyName {
      margin-left: 0 0 0 1px;
    }
  }
`

export const DashboardDropdownOverlay = styled.div`
  .dashboard-dropdown {
    padding: 0;
  }
  .dashboard-dropdown > .ant-dropdown-menu-item {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
  .dashboard-dropdown > .ant-dropdown-menu-item > .ant-dropdown-menu-item-icon {
    margin-left: 8px;
    margin-right: 0;
  }
`

export const CartText = styled.span<{ hasCount: boolean }>`
  ${({ hasCount }) => (hasCount ? 'color:#FFB800;' : 'color:#909195;')}
`
