import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

import AppError from '@shared/errors/AppError'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let fakeCacheProvider: FakeCacheProvider

let createAppointment: CreateAppointmentService

const oneHour = 60 * 60 * 1000

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    )
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(Date.now() + oneHour),
      provider_id: 'provider-id',
      user_id: 'user-id'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('provider-id')
  })

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(Date.now() + oneHour)

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id'
    })

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'provider-id',
        user_id: 'user-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
