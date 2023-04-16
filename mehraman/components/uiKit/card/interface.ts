import { CardProps } from "antd";
import { CSSProperties } from "styled-components";

export interface ICardProps {
    title?:string
    cardProps?:CardProps
    children?: JSX.Element
    bordered?:boolean
    extra?:JSX.Element
    containerClassName?:string
    className?:string
    style?:CSSProperties
    lessHeaderBorder?:boolean
    headStyle?:CSSProperties
}