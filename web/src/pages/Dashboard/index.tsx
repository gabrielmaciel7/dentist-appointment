import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { isToday, isAfter, parseISO, format } from 'date-fns'
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

import api from '../../services/api'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

import CalendarLoader from '../../components/ContentLoaders/Dashboard/CalendarLoader'
import AppointmentLoader from '../../components/ContentLoaders/Dashboard/AppointmentLoader'

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

  const [calendarLoading, setCalendarLoading] = useState(true)
  const [appointmentLoading, setAppointmentLoading] = useState(true)

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([])

  const { signOut, user } = useAuth()
  const { addToast } = useToast()

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) setSelectedDate(day)
  }, [])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  useEffect(() => {
    async function getMonthAvailability(): Promise<void> {
      try {
        setCalendarLoading(true)

        const response = await api.get(
          `/providers/${user.id}/month-availability`,
          {
            params: {
              year: currentMonth.getFullYear(),
              month: currentMonth.getMonth() + 1
            }
          }
        )

        setTimeout(() => {
          setMonthAvailability(response.data)
          setCalendarLoading(false)
        }, 2000)
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error.',
          description: err.message
        })
      }
    }

    getMonthAvailability()
  }, [currentMonth, user, addToast])

  useEffect(() => {
    async function getAppointments(): Promise<void> {
      try {
        setAppointmentLoading(true)

        const appointments = await api.get<Appointment[]>('/providers/me', {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate()
          }
        })

        const appointmentsFormatted = appointments.data.map(appointment => {
          appointment.user.avatar_url =
            appointment.user.avatar_url ?? 'https://github.com/github.png'

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

        setTimeout(() => {
          setAppointments(appointmentsFormatted)
          setAppointmentLoading(false)
        }, 2000)
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error.',
          description: err.message
        })
      }
    }

    getAppointments()
  }, [selectedDate, addToast])

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

  const nextAppointment = useMemo(() => {
    if (isToday(selectedDate)) {
      return appointments.find(appointment =>
        isAfter(parseISO(appointment.date), new Date())
      )
    }
  }, [selectedDate, appointments])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Whiteeth" />

          <div>
            <Link to="/profile">
              <Profile>
                <img src={user.avatar_url} alt={user.name} />

                <div>
                  <span>Welcome</span>
                  <strong>{user.name}</strong>
                </div>
              </Profile>
            </Link>

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
            {!appointmentLoading && nextAppointment && (
              <>
                <strong>Next Appointment</strong>
                <Appointment className="nextToday">
                  <img
                    src={nextAppointment.user.avatar_url}
                    alt={nextAppointment.user.name}
                  />

                  <p>{nextAppointment.user.name}</p>
                  <span>
                    <FiClock />
                    {nextAppointment.hourFormatted}
                  </span>
                </Appointment>
              </>
            )}

            <strong>Appointments</strong>

            {appointmentLoading ? (
              <div
                style={{
                  marginTop: 32,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <AppointmentLoader />
                <AppointmentLoader />
              </div>
            ) : (
              appointments.length <= 0 && <p>No appointments.</p>
            )}

            {!appointmentLoading &&
              appointments.map(appointment => (
                <Appointment key={appointment.id}>
                  <img
                    src={appointment.user.avatar_url}
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
          {calendarLoading ? (
            <CalendarLoader />
          ) : (
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
          )}
        </Calendar>
      </Content>
    </Container>
  )
}

export default Dashboard
