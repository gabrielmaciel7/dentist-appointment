import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

import ForgotBackgroundImg from '../../assets/images/dentist02.jpg'

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${appearFromRight} 1s;

  img {
    width: 340px;
  }

  form {
    margin: 48px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      color: #000;
      font-family: Quicksand;
      font-weight: 400;
    }
  }

  > a {
    color: #000;
    display: block;
    margin-top: 16px;
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
  background: url(${ForgotBackgroundImg}) no-repeat center;
  background-size: cover;
`
