import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface ContainerProps {
  isFilled: boolean
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  border: 2px solid #a5ffd6;
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
