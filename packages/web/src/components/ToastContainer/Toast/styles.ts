import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface ContainerProps {
  type?: string
  hasDescription: boolean
}

const toastTypeVariations = {
  info: css`
    background: #edfff7;
    color: ${shade(0.2, '#84dcc6')};
  `,
  success: css`
    background: #84dcc6;
    color: ${shade(0.2, '#28423C')};
  `,
  error: css`
    background: #ffa69e;
    color: ${shade(0.2, '#FF686B')};
  `
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 360px;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;

  display: flex;

  ${props => toastTypeVariations[props.type || 'info']}

  & + div {
    margin-top: 8px;
  }

  > svg {
    margin: 0px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    top: 15px;
    right: 16px;
    opacity: 0.7;
    border: 0;
    background: transparent;
    color: inherit;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }

  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;
    `}
`
