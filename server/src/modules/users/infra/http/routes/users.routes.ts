import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'

import UsersController from '@modules/users/infra/http/controllers/UsersController'
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController'
import { createUserValidator } from '@modules/users/infra/http/middlewares/usersValidator'
import jwtAuthenticator from '@modules/users/infra/http/middlewares/jwtAuthenticator'

const usersRouter = Router()
const upload = multer(uploadConfig)
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRouter.post('/', createUserValidator, usersController.create)

usersRouter.patch(
  '/avatar',
  jwtAuthenticator,
  upload.single('avatar'),
  userAvatarController.update
)

export default usersRouter
