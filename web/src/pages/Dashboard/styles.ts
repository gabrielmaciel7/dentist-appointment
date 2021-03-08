import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div``

export const Header = styled.header`
  padding: 24px 0;
  background: #28423c;
`

export const HeaderContent = styled.div`
  width: 90%;
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
      color: #ffa69e;
      width: 25px;
      height: 25px;
      transition: 0.1s all;

      &:hover {
        color: #ff686b;
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

export const Content = styled.main`
  width: 90%;
  max-width: 1120px;
  margin: 48px auto;
  display: flex;
`

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-family: Quicksand;
    font-weight: 400;
    font-size: 36px;
    color: #000;
  }

  p {
    margin-top: 8px;
    color: #000;
    display: flex;
    align-items: center;
    font-weight: 700;

    span {
      display: flex;
      align-items: center;
    }
  }
`

export const NextAppointment = styled.div`
  margin-top: 48px;

  > strong {
    color: #000;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: ${darken(0.05, '#edfff7')};
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 80%;
      width: 2px;
      left: 0;
      top: 10%;
      background: #84dcc6;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #000;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #28423c;

      svg {
        margin-right: 8px;
      }
    }
  }
`

export const Calendar = styled.aside`
  width: 380px;
`
