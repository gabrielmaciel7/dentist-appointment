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

  > p {
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

  div:first-of-type {
    margin-bottom: 48px;
    font-weight: bold;

    &::before {
      content: '';
      position: absolute;
      height: 80%;
      width: 3px;
      left: 0;
      top: 10%;
      background: #84dcc6;
    }

    & span {
      color: #28423c;
    }

    & svg {
      stroke-width: 3px;
    }
  }
`

export const Appointment = styled.div`
  background: ${darken(0.05, '#edfff7')};
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-radius: 10px;
  margin-top: 24px;
  position: relative;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  p {
    margin-left: 24px;
    color: #000;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #000;

    svg {
      margin-right: 8px;
    }
  }
`

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: #28423c;
    border-radius: 10px;
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: ${darken(-0.1, '#A5FFD6')};
    border-radius: 10px;
    color: #28423c;
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: #a5ffd6;
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #000 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: ${darken(0.2, '#84dcc6')} !important;
    border-radius: 10px;
    color: #232129 !important;
    font-weight: bold;
  }
  .DayPicker-Caption {
    color: #fff;
  }
  .DayPicker-Weekday {
    color: ${darken(-0.1, '#A5FFD6')};
  }
  .DayPicker-NavButton {
    filter: brightness(200%);
  }
`
