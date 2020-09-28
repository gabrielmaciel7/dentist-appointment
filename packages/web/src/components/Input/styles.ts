import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  border-radius: 10px;
  border: 2px solid #84dcc6;
  padding: 16px;
  width: 100%;
  color: #84dcc6;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

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
