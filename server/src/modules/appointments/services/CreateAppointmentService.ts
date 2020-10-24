import { startOfHour, isBefore, getHours } from 'date-fns'
import { inject, injectable } from 'tsyringe'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

import getMessage from '@shared/services/GetMessageService'
import AppError from '@shared/errors/AppError'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
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
      appointmentDate
    )

    if (findAppointmentInSameDate) {
      throw new AppError(getMessage('appointments.create.already_booked'))
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
