import styled from 'styled-components'

export const Container = styled.div`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  display: block;
  animation: fadeIn 0.5s;

  .display-none.on {
    display: block;
    animation: fadeOut 0.5s;
    animation-fill-mode: forwards;
  }
`
