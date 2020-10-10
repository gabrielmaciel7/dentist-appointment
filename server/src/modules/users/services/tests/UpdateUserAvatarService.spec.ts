import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import CreateUserService from '@modules/users/services/CreateUserService'

import AppError from '@shared/errors/AppError'

describe('UpdateUserAvatar', () => {
  it('should be able to update a user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      avatar: ''
    })

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    expect(user.avatar).toBe('avatar.jpg')
  })

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )

    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()
    const fakeHashProvider = new FakeHashProvider()

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      avatar: ''
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toBe('avatar2.jpg')
  })
})
