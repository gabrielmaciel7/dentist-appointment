import { startOfHour, isBefore, getHours, format } from 'date-fns'
import { inject, injectable } from 'tsyringe'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

import getMessage from '@shared/services/GetMessageService'
import AppError from '@shared/errors/AppError'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    date,
    provider_id,
    user_id
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError(getMessage('appointments.create.past_date'))
    }

    if (user_id === provider_id) {
      throw new AppError(getMessage('appointments.create.invalid_provider'))
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(getMessage('appointments.create.invalid_hour'))
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id
    )

    if (findAppointmentInSameDate) {
      throw new AppError(getMessage('appointments.create.already_booked'))
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate
    })

    const dateFormatted = format(appointmentDate, 'yyyy-MM-dd HH:mm')

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `New appointment: ${dateFormatted}`
    })

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d'
      )}`
    )

    return appointment
  }
}

export default CreateAppointmentService
