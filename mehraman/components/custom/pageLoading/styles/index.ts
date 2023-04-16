import styled, { keyframes } from 'styled-components'
const fade = keyframes`
from{
  opacity: 0;
}
to{
  opacity: 1;
}
`
export const PreLoadingImageContainer = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  animation: failLoadingContainer 1s 1 both;
  animation-delay: 2s;

  .loadingMobileImage {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: failLoadingImg 2s 1 both;
  }
  .perLoadingLogo {
    position: absolute;
    width: 200px;
    top: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${fade} 1s 1 both;
    animation-delay: 1.5s;
  }
  @keyframes failLoadingImg {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }

    50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      top: 50%;
    }

    100% {
      top: 15%;
      opacity: 0;
    }
  }

  @keyframes failLoadingContainer {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.5;
    }

    75% {
      opacity: 0;
      display: none;
      visibility: none;
      width: 100%;
      height: 100vh;
    }

    100% {
      opacity: 0;
      width: 0;
      height: 0;
      display: none !important;
      visibility: none;
      top: 0;
      z-index: -1;
    }
  }
`

export const LoadingLogoImage = styled.section`
  z-index: 1000;

  .logoMobileImage {
    opacity: 1;
    width: 200px;
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes failLoadingLogo {
    0% {
      opacity: 0;
    }

    75% {
      opacity: 0.4;
    }

    100% {
      opacity: 1;
      top: 5%;
    }
  }

  @media (min-width: 768px) {
    display: none !important;
    width: 0;

    .logoMobileImage {
      display: none;
    }
  }
`
