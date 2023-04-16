import styled from 'styled-components'

export const FormatPlaqueCarContainer = styled.section`
  display: flex;
  align-items: flex-end;

  .margin-b-0 {
    margin-bottom: 0 !important;
  }

  input {
    padding: 0;
    text-align: center;
  }

  .inpTwoWord {
    width: 60px;
  }

  .inpThreeWord {
    width: 100px;
  }

  .selectBoxWord {
    width: 60px;
    margin: 0 5px;
    .ant-select-selector {
      border: none !important;
    }

    .ant-select-selection-placeholder {
      color: #8c8c8c !important;
    }
  }

  .countryWord {
    width: 50px;
    font-size: 14px;
    text-align: center;
    color: #8c8c8c;
  }

  @media only screen and (max-width: 992px) {
    justify-content: space-around;
  }

  @media only screen and (max-width: 401px) {
    justify-content: center;
    transform: scale(0.9);
  }
`

export const FormatPlaqueMotorcycleBox = styled.section`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  column-gap: 10px;

  input {
    padding: 0;
    text-align: center;
    width: 100%;
  }

  .inpThreeWord {
    width: 40%;
  }

  .inpFiveWord {
    width: 50%;
  }

  .margin-b-0 {
    margin-bottom: 0 !important;
  }
`
