import styled, { css } from 'styled-components'
import { shade } from 'polished'

import Tooltip from '../Tooltip'

interface ContainerProps {
  isFilled: boolean
  hasError: boolean
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  border: 2px solid #84dcc6;
  padding: 16px;
  width: 100%;
  color: #a5ffd6;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  &:focus-within {
    border: 2px solid ${shade(0.4, '#84dcc6')};
    color: ${shade(0.4, '#84dcc6')};
  }

  ${props =>
    props.isFilled &&
    css`
      color: ${shade(0.4, '#84dcc6')};
    `}

  ${props =>
    props.hasError &&
    css`
      border: 2px solid #ffa69e;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;

    &::placeholder {
      color: #84dcc6;
    }
  }

  svg {
    margin-right: 16px;
  }
`

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0 0 0 16px;
    color: #ffa69e;
    size: 20px;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #ff686b;
    }
  }

  span {
    background: #ff686b;
    color: #fff;

    &::before {
      border-color: #ff686b transparent;
    }
  }
`
