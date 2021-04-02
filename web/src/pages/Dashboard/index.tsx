import React, { useState, useCallback, useEffect, useMemo } from 'react'

import { isToday, parseISO, format } from 'date-fns'
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Title,
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

interface Appointment {
  id: string
  date: string
  hourFormatted: string
  user: {
    name: string
    avatar_url: string
  }
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([])

  const { signOut, user } = useAuth()

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) setSelectedDate(day)
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
    api
      .get<Appointment[]>('/providers/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate()
        }
      })
      .then(response => {
        const appointmentsFormatted = response.data.map(appointment => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm')
          }
        })

        appointmentsFormatted.sort((a, b) => {
          if (Date.parse(a.date) > Date.parse(b.date)) return 1
          if (Date.parse(a.date) < Date.parse(b.date)) return -1
          return 0
        })

        setAppointments(appointmentsFormatted)
      })
  }, [selectedDate])

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

  const selectedDateAsText = useMemo(() => {
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }, [selectedDate])

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

      <Title>
        <h1>Schedules</h1>
        <p>
          <span>{selectedDateAsText}</span>
        </p>
      </Title>

      <Content>
        <Schedule>
          <NextAppointment>
            <strong>Appointments</strong>

            {appointments.map((appointment, index) => (
              <Appointment
                key={appointment.id}
                className={
                  isToday(parseISO(appointment.date)) && index === 0
                    ? 'nextToday'
                    : ''
                }
              >
                <img
                  src={
                    appointment.user.avatar_url
                      ? appointment.user.avatar_url
                      : 'https://github.com/github.png'
                  }
                  alt={appointment.user.name}
                />

                <p>{appointment.user.name}</p>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
              </Appointment>
            ))}
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
