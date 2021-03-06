import React from 'react'

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Calendar
} from './styles'

import logoImg from '../../assets/logo02.svg'
import { FiClock, FiPower } from 'react-icons/fi'

import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Whiteeth" />

          <div>
            <Profile>
              <img
                src={
                  user.avatar_url
                    ? user.avatar_url
                    : 'https://github.com/github.png'
                }
                alt={user.name}
              />

              <div>
                <span>Welcome</span>
                <strong>{user.name}</strong>
              </div>
            </Profile>

            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </div>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Schedules</h1>
          <p>
            <span>Today</span>
            <span>March 6</span>
            <span>Saturday</span>
          </p>

          <NextAppointment>
            <strong>Next appointment</strong>
            <div>
              <img
                src="https://github.com/gabrielmaciel7.png"
                alt="Gabriel Maciel"
              />

              <strong>Gabriel Maciel</strong>
              <span>
                <FiClock />
                11:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>

        <Calendar />
      </Content>
    </Container>
  )
}

export default Dashboard
