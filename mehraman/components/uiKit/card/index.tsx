import { FC } from 'react'
import { ICardProps } from './interface'
import { CardContainer } from './styles'
import { Card } from 'antd'

export const CardUiKit: FC<ICardProps> = ({
  cardProps,
  children,
  title,
  bordered,
  style,
  className,
  containerClassName,
  extra,
  lessHeaderBorder = true,
  headStyle,
}) => {
  return (
    <CardContainer className={containerClassName} lessHeaderBorder={lessHeaderBorder}>
      <Card {...cardProps} title={title} bordered={bordered} style={style} className={className} extra={extra} headStyle={headStyle}>
        {children}
      </Card>
    </CardContainer>
  )
}
