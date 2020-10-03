import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.button`
  background: #28423c;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#28423c')};
  }

  &:disabled {
    background: #84dcc6;
    cursor: default;

    &:hover {
      background: #84dcc6;
    }
  }
`
