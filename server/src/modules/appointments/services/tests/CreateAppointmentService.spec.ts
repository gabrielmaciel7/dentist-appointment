import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

import AppError from '@shared/errors/AppError'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '2121212',
      user_id: '2121212'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('2121212')
  })

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date()

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '2121212',
      provider_id: '2121212'
    })

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '2121212',
        user_id: '2121212'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
