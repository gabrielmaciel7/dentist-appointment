import { v4 as uuidv4 } from 'uuid'
import { isEqual } from 'date-fns'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    )

    return findAppointment
  }

  public async create({
    provider_id,
    user_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: uuidv4(), date, provider_id, user_id })

    this.appointments.push(appointment)

    return appointment
  }

  public async findAllInMonthFromProvider({
    month,
    provider_id,
    year
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const findAppointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        appointment.date.getMonth() === month &&
        appointment.date.getFullYear() === year
    )

    return findAppointments
  }

  public async findAllInDayFromProvider({
    year,
    month,
    day,
    provider_id
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const findAppointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        appointment.date.getMonth() === month &&
        appointment.date.getFullYear() === year &&
        appointment.date.getDay() === day
    )

    return findAppointments
  }
}

export default AppointmentsRepository
