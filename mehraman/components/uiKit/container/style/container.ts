import styled from 'styled-components'

export const ContainerStyles = styled.div`
  padding: 16px;
  /* padding-right:32px; */
  margin-top: 66px;
  min-height: calc(100vh - 198px);
  @media only screen and (max-width: 992px) {
    padding: 0px 0px 16px 0px;
    width: 100vw;
    background: #fdfdfd;
    max-height: calc(100vh - 198px);
    overflow-x: hidden;
  overflow-y: scroll;
      margin-top: 66px;
    &&.fixHeight {
      max-height: 100vh;
    }
  }
`
