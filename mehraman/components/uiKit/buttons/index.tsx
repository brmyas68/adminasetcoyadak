import { CSSProperties, FC } from "react";
import { ButtonContainer } from "./styles";
import { BaseButtonProps } from "antd/lib/button/button";

interface IButtonProps extends BaseButtonProps {
  onClick?: () => void;
  htmlType?: "submit" | "button" | "reset";
  className?: string;
  style?: CSSProperties;
  fontSize?: number | string;
}
export const ButtonUiKit: FC<IButtonProps> = ({
  children,
  type = "primary",
  onClick,
  className,
  loading,
  htmlType,
  icon,
  disabled,
  style,
  fontSize,
}) => {
  return (
    <ButtonContainer
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={className}
      loading={loading}
      htmlType={htmlType}
      icon={icon}
      style={{ ...style, fontSize }}
    >
      {children}
    </ButtonContainer>
  );
};
