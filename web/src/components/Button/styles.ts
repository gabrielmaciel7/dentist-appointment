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

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Quicksand;
  font-weight: 400;

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

  .loader {
    border: 6px solid rgba(255, 255, 255, 0.3);
    border-top: 6px solid #28423c;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1.4s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
