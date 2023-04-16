import styled from 'styled-components'

export const PreLoadingImageContainer = styled.div<{ loading: 'true' | 'false' }>`
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${({ loading }) =>
    loading === 'false'
      ? `
  display:none;
  opacity:0;
  width:0;
  height:0;
  visible:none;
  `
      : ''}
  .loadingImage {
    width: 100%;

    @media (min-width: 1386px) {
      width: 70%;
    }
  }
`
