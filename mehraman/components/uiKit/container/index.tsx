import { FC } from "react";
import { ContainerStyles } from "./style/container";
import { IContainer } from "./interface/IContainer";
import { useSelector } from "react-redux";
import { activeBackButton } from "store/selectors";

export const Container: FC<IContainer> = ({ children, className }) => {
  const isActiveBackButton = useSelector(activeBackButton);

  return (
    <ContainerStyles
      className={`${isActiveBackButton === true && "fixHeight"} ${
        className || ""
      }`}
    >
      {children}
    </ContainerStyles>
  );
};
