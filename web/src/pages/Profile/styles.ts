import styled from 'styled-components'
import { shade } from 'polished'

export const Display = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Container = styled.div`
  width: 100vw;

  > header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 144px;

    > div {
      width: 80%;
      max-width: 1120px;
      margin: 0 auto;

      > a {
        color: #000;
        text-decoration: none;
        margin-top: 32px;

        text-decoration: none;
        font-weight: 700;

        transition: color 0.2s;

        &:hover {
          color: ${shade(0.3, '#28423C')};
        }

        div {
          display: flex;
          align-items: center;

          svg {
            width: 24px;
            height: 24px;
            margin-right: 16px;
          }
        }
      }
    }
  }

  @media (max-width: 700px) {
    header > div {
      width: 90%;

      a div {
        svg {
          position: relative;
          z-index: 5;
        }

        p {
          display: none;
        }
      }
    }
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: -184px auto 0;

  max-width: 700px;

  img {
    width: 340px;

    @media (max-width: 400px) {
      width: 320px;
    }
  }

  form {
    margin: 40px 0 0;
    width: 340px;
    display: flex;
    flex-direction: column;
    text-align: center;

    @media (max-width: 400px) {
      width: 320px;
    }

    h1 {
      margin-bottom: 16px;
      color: #000;
      font-family: Quicksand;
      font-weight: 400;
      font-size: 24px;
    }
  }

  @media (max-width: 1000px) {
    max-width: 1024px;
  }
`

export const AvatarInput = styled.div`
  margin-bottom: 16px;
  position: relative;
  width: 160px;
  align-self: center;

  img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
  }

  button {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #28423c;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    transition: 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 20px;
      color: #fff;
    }

    &:hover {
      background: ${shade(0.1, '#28423c')};
    }
  }
`
