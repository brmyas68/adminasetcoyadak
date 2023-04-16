import styled from 'styled-components'

export const InputCodeContainer = styled.div<{ error?: boolean | undefined; dir?: 'rtl' | 'ltr'; disabled: boolean }>`
  border: none;
  border-bottom: 2px solid #d9d9d9;
  display: flex;
  justify-content: center;
  padding: 4px 16px;
  direction: ${({ dir }) => dir};
  background: ${({ disabled }) => (disabled ? '#d9d9d96b' : 'initial')};

  & div {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-direction: row-reverse;
    & input {
      width: 30px;
      padding: 4px;
      /* margin-left: 10px; */
      background: none;
    }
  }
  .react-code-input {
    display: flex !important;
    justify-content: center;
  }
  .codeInput {
    width: 28px;
    height: 28px;
  }
  input:focus {
    outline: 0 0 2px 0;
    border-bottom: 2px solid #bbb;
  }
  input {
    text-align: center;
    outline: none;
    border: unset;
    border-radius: unset;
    border-bottom: 2px solid ${({ error }) => (error ? 'red' : ' #d9d9d9')};
  }
`
