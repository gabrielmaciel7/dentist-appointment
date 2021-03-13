import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0
  }

  body {
    background: linear-gradient(to bottom right, #edfff7, #fff);
    color: #000;
    -webkit-font-smoothing: antialiased
  }

  body, input, button {
    font-family: Roboto, sans-serif;
    font-size: 16px
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }

  button {
    cursor: pointer;
    font-weight: 700;
  }

  @media (max-width: 400px) {
    body {
      font-size: 90%;
    }
  }
`
