import { Router } from 'express'
import { container } from 'tsyringe'
import multer from 'multer'
import uploadConfig from '@config/upload'

import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import { createUserValidator } from '@modules/users/infra/http/middlewares/usersValidator'
import jwtAuthenticator from '@modules/users/infra/http/middlewares/jwtAuthenticator'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', createUserValidator, async (request, response) => {
  const { name, email, password, avatar = '' } = request.body

  const createUser = container.resolve(CreateUserService)

  const user = await createUser.execute({
    name,
    email,
    password,
    avatar
  })

  delete user.password

  return response.json(user)
})

usersRouter.patch(
  '/avatar',
  jwtAuthenticator,
  upload.single('avatar'),

  async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    delete user.password

    return response.json(user)
  }
)

export default usersRouter
