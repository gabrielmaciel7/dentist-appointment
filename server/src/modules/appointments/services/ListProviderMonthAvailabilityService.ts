import { injectable, inject } from 'tsyringe'
import { getDaysInMonth, getDate, isAfter, isToday } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import { compare } from 'bcryptjs'

interface IRequest {
  provider_id: string
  month: number
  year: number
}

type IResponse = Array<{
  day: number
  available: boolean
}>

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    month,
    year
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      { provider_id, month, year }
    )

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    )

    const availability = eachDayArray.map(day => {
      const currentDate = new Date(Date.now())
      const compareDate = new Date(year, month - 1, day)

      const hourEnd = 17
      const hoursAvailablePerDay = 10

      const appointmentsInDay = appointments.filter(appointment =>
        isToday(compareDate)
          ? getDate(appointment.date) === day && appointment.date > currentDate
          : getDate(appointment.date) === day
      )

      console.log('day', day)
      console.log('appointmentsInDay', appointmentsInDay.length)
      console.log(
        'available',
        isToday(compareDate)
          ? hourEnd - currentDate.getHours()
          : hoursAvailablePerDay
      )
      console.log(
        'availableBool',
        isToday(compareDate)
          ? appointmentsInDay.length < hourEnd - currentDate.getHours()
          : appointmentsInDay.length < hoursAvailablePerDay
      )
      console.log()

      const followingDay = new Date(compareDate)

      return {
        day,
        available: isAfter(followingDay.setHours(24), currentDate)
          ? isToday(compareDate)
            ? appointmentsInDay.length < hourEnd - currentDate.getHours()
            : appointmentsInDay.length < hoursAvailablePerDay
          : false
      }
    })

    return availability
  }
}

export default ListProviderMonthAvailabilityService
