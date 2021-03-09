import React, { useState, useCallback } from 'react'

import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Appointment,
  Calendar
} from './styles'

import logoImg from '../../assets/logo02.svg'
import { FiClock, FiPower } from 'react-icons/fi'

import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const { signOut, user } = useAuth()

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) setSelectedDate(day)
  }, [])

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
            <span>
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </p>

          <NextAppointment>
            <strong>Next appointments</strong>

            <Appointment>
              <img
                src="https://github.com/gabrielmaciel7.png"
                alt="Gabriel Maciel"
              />

              <p>Gabriel Maciel</p>
              <span>
                <FiClock />
                11:00
              </span>
            </Appointment>
            <Appointment>
              <img
                src="https://github.com/gabrielmaciel7.png"
                alt="Gabriel Maciel"
              />

              <p>Gabriel Maciel</p>
              <span>
                <FiClock />
                11:00
              </span>
            </Appointment>
            <Appointment>
              <img
                src="https://github.com/gabrielmaciel7.png"
                alt="Gabriel Maciel"
              />

              <p>Gabriel Maciel</p>
              <span>
                <FiClock />
                11:00
              </span>
            </Appointment>
          </NextAppointment>
        </Schedule>

        <Calendar>
          <DayPicker
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] }
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
          />
        </Calendar>
      </Content>
    </Container>
  )
}

export default Dashboard
