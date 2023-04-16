import styled from 'styled-components'

export const AboutUsDescriptionBox = styled.section`
  height: calc(100vh - 128px);
  width: 100%;
  background: #f0f0f0;
  padding: 24px;
  overflow-y: scroll;
  overflow-x: hidden;
  text-align: right;
  position: relative;

  &::after {
    content: '';
    display: none;
    width: 100%;
    height: 100%;
    z-index: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url('/assets/images/aboutUs/banner.svg') no-repeat center/cover;
    opacity: 0.3;
  }

  @media only screen and (max-width: 1199px) {
    height: 100%;

    &::after {
      display: block;
    }
  }

  //scroll
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 20px;
  }
`
