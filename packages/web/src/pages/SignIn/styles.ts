import styled from 'styled-components'
import { shade } from 'polished'

import signInBackgroundImg from '../../assets/images/dentist01.jpg'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  img {
    width: 340px;
  }

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      color: #28423c;
    }

    input {
      background: #84dcc6;
      border-radius: 10px;
      border: 2px solid #84dcc6;
      padding: 16px;
      width: 100%;
      color: #000;

      & + input {
        margin-top: 8px;
      }

      &::placeholder {
        color: #fff;
      }
    }

    button {
      background: #28423c;
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      color: #fff;
      width: 100%;
      margin-top: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${shade(0.2, '#28423c')};
      }
    }

    a {
      color: #28423c;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.4, '#28423c')};
      }
    }
  }

  > a {
    color: #28423c;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    font-weight: 700;

    display: flex;
    align-items: center;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.4, '#28423c')};
    }

    svg {
      margin-right: 16px;
    }
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`
