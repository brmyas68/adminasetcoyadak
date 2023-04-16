import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react'
import AuthCode, { AuthCodeRef } from 'react-auth-code-input'
import { InputCodeContainer } from './styles'

interface IInputCode {
  className?: string
  fields: number
  onChange?: (value: string) => void
  containerClassName?: string
  autoFocus?: boolean
  clear: boolean
  setClear: Dispatch<SetStateAction<boolean>>
  isValid?: boolean
  disabled?: boolean
  dir?: 'rtl' | 'ltr'
}
export const InputCode: FC<IInputCode> = ({
  className,
  fields,
  onChange,
  containerClassName,
  autoFocus = true,
  clear,
  setClear,
  isValid,
  disabled = false,
  dir = 'rtl',
}) => {
  const inputRef = useRef<AuthCodeRef>(null)
  useEffect(() => {
    document
      .getElementsByClassName('react-code-input')
      .item(0)
      ?.setAttribute('style', 'display: flex !important;flex-direction: row-reverse;')
  })

  useEffect(() => {
    if (clear) inputRef.current?.clear()
    setClear(false)
  }, [clear, setClear])
  return (
    <InputCodeContainer className={containerClassName} id="200" error={isValid} dir={dir} disabled={disabled}>
      <AuthCode
        onChange={onChange!}
        ref={inputRef}
        length={fields}
        autoFocus={autoFocus}
        inputClassName={className}
        allowedCharacters={'numeric'}
        disabled={disabled}
      />
    </InputCodeContainer>
  )
}
