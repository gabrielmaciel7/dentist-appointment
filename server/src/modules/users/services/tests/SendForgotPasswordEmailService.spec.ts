import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeMailProvider: FakeMailProvider

let SendForgotPasswordEmail: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeMailProvider = new FakeMailProvider()

    SendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    )
  })

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      avatar: ''
    })

    await SendForgotPasswordEmail.execute({
      email: 'johndoe@example.com'
    })

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      SendForgotPasswordEmail.execute({
        email: 'johndoe@example.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      avatar: ''
    })

    await SendForgotPasswordEmail.execute({
      email: 'johndoe@example.com'
    })

    expect(generateToken).toHaveBeenCalledWith(user.id)
  })
})
