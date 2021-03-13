import React, { useState, useCallback, useEffect, useMemo } from 'react'

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
import api from '../../services/api'

interface MonthAvailabilityItem {
  day: number
  available: boolean
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [currentMonth, setCurrentMonth] = useState(new Date())

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([])

  const { signOut, user } = useAuth()

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) setSelectedDate(day)
  }, [])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1
        }
      })
      .then(response => {
        setMonthAvailability(response.data)
      })
  }, [currentMonth, user])

  useEffect(() => {
    if (
      monthAvailability.length > 0 &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      (monthAvailability.some(
        avilable =>
          avilable.day === selectedDate.getDate() && !avilable.available
      ) ||
        [0, 6].some(day => day === selectedDate.getDay()))
    ) {
      const newDate = new Date(selectedDate)

      do {
        newDate.setDate(newDate.getDate() + 1)
      } while (
        monthAvailability.some(
          avilable => avilable.day === newDate.getDate() && !avilable.available
        ) ||
        [0, 6].some(day => day === newDate.getDay())
      )

      setSelectedDate(newDate)
    }
  }, [monthAvailability, currentMonth, selectedDate])

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()

        return new Date(year, month, monthDay.day)
      })

    return dates
  }, [currentMonth, monthAvailability])

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
            <strong>Appointments</strong>

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
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] }
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
          />
        </Calendar>
      </Content>
    </Container>
  )
}

export default Dashboard
