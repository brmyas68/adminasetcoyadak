import { IDirectionProps } from 'models/interfaces/directionProps'
import styled from 'styled-components'

export const AboutDescArticleBox = styled.section<IDirectionProps>`
  margin: 3rem 0;
  direction: ${props => props.dir};

  .article__paragraph {
    color: #000000;
    font-weight: 600;
    line-height: 32px;
  }
`
