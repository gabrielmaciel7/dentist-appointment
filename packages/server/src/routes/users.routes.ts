/* eslint-disable camelcase */
import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'
import { createUserValidator } from './../middlewares/usersValidator'
import jwtAuthenticator from 'src/middlewares/jwtAuthenticator'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', createUserValidator, async (request, response) => {
  const { name, email, password, avatar = '' } = request.body

  const createUser = new CreateUserService()

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
    const updateUserAvatar = new UpdateUserAvatarService()

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    delete user.password

    return response.json(user)
  }
)

export default usersRouter
