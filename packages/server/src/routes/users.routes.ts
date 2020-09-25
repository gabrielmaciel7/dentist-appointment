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

// eslint-disable-next-line prettier/prettier
usersRouter.post('/', createUserValidator, async(request, response) => {
  try {
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
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

usersRouter.patch(
  '/avatar',
  jwtAuthenticator,
  upload.single('avatar'),
  // eslint-disable-next-line prettier/prettier
  async(request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService()

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename
      })

      delete user.password

      return response.json(user)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
)

export default usersRouter
