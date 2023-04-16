import { breakPointScreen } from 'constants/breakPointScreen'
import styled from 'styled-components'

export const GetUserInfoButtonsContainer = styled.div`
  display: inline-flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  .submit,
  .cancel,
  .back {
    padding: 8px 16px;
    border-radius: 12px;
  }

  .submit {
    width: 130px;
    flex-direction: row-reverse;
  }
  .cancel {
    background: #f2f2f2;
    color: black;
    width: 110px;
    @media only screen and (max-width: ${breakPointScreen}px) {
      display: none;
    }
  }
  .back {
    width: 130px;
    background: #f2f2f2;
    color: black;
  }
  .btn-margin-right {
    margin-right: 10px;
  }
`
