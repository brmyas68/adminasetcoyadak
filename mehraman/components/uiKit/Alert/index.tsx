import { Typography } from 'antd'
import { errorSvg, pendingSvg, warningSvg } from 'public/assets/images/common/Alert'
import { confirmAlert, ReactConfirmAlertProps } from 'react-confirm-alert'
import { ButtonUiKit } from '../buttons'
import { AlertContainer } from './style'
interface IAlertProps {
  type: 'error' | 'warning' | 'info' | 'success' | 'default'
  message: string
  onClick?: () => void
}
export const Alert: (props: IAlertProps) => void = ({ type, message, onClick }) => {
  const { Title } = Typography
  const Header = () => {
    switch (type) {
      case 'error':
        return (
          <>
            <div className="icon "> {errorSvg}</div>
            <Title level={5} className="error title">
              اخطار
            </Title>
          </>
        )
      case 'warning':
        return (
          <>
            <div className="icon"> {warningSvg}</div>
            <Title level={5} className="warning title">
              توجه
            </Title>
          </>
        )
      case 'info':
        return (
          <>
            <div className="icon"> {pendingSvg}</div>
            <Title level={5} className="info title">
              بررسی اطلاعات
            </Title>
          </>
        )
      case 'success':
        return (
          <>
            <Title level={5} className="success title">
              موفق
            </Title>
          </>
        )
      case 'default':
        return <></>
      default:
        return <Title level={5}>title</Title>
    }
  }
  const Option: ReactConfirmAlertProps = {
    customUI: ({ onClose }) => {
      return (
        <AlertContainer>
          <Typography className="typography">
            <Header />
            <div className="message " dir="rtl">
              {message}
            </div>
            <ButtonUiKit
              onClick={() => {
                if (onClick) onClick()
                onClose()
              }}
              className="closeButton"
              type={type === 'default' ? 'link' : 'primary'}
            >
              بستن
            </ButtonUiKit>
          </Typography>
        </AlertContainer>
      )
    },
    closeOnEscape: true,
    closeOnClickOutside: false,
    keyCodeForClose: [8, 32],
  }
  confirmAlert(Option)
}
