import styled from 'styled-components'
import { gapSizes, screenSizes } from './theme'

export const pageContentWidth = '1530'

export const PageContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  max-width: ${pageContentWidth}px;
  min-height: auto;
  padding: ${(props: any) => !props.noPadding ? `${gapSizes.XXL} 0 ` : '0'};
  padding-bottom: 100px;
  transition: all 300ms ease-in-out;
  margin-top: 5em;
  @media (max-width: ${screenSizes.M}px) {
    padding-bottom : 0;
  }
`