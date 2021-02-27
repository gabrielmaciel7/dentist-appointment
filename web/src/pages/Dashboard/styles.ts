import styled from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.div``

export const Header = styled.header`
  padding: 24px 0;
  background: #28423c;
`

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > img {
    height: 60px;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  button {
    margin-left: 32px;
    background: transparent;
    border: 0;

    svg {
      color: #84dcc6;
      width: 25px;
      height: 25px;

      &:hover {
        color: ${lighten(0.1, '#84dcc6')};
      }
    }
  }
`

export const Profile = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #edfff7;
    }

    strong {
      color: #84dcc6;
    }
  }
`
