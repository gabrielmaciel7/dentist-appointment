import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import JwtTokenProvider from '@modules/users/providers/TokenProvider/implementations/JwtTokenProvider'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import CreateUserService from '@modules/users/services/CreateUserService'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeCacheProvider: FakeCacheProvider

let tokenProvider: JwtTokenProvider

let authenticateUser: AuthenticateUserService
let createUser: CreateUserService

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()
    tokenProvider = new JwtTokenProvider()

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      tokenProvider
    )

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    )
  })

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      avatar: ''
    })

    const authUser = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(authUser).toHaveProperty('token')
    expect(authUser.user).toEqual(user)
  })

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      avatar: ''
    })

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
