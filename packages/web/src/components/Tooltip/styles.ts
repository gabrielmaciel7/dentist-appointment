import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  z-index: 10;

  span {
    position: absolute;
    background: #84dcc6;
    color: #fff;
    padding: 8px;
    width: 160px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 700;
    opacity: 0;
    visibility: hidden;

    bottom: calc(100% + 12px);
    left: calc(50% + 8px);
    transform: translateX(-50%);
    transition: opacity 0.4s;

    &::before {
      content: '';
      position: absolute;
      border-style: solid;
      border-color: #84dcc6 transparent;
      border-width: 6px 6px 0 6px;
      bottom: 20px;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`
