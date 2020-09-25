/* eslint-disable camelcase */
import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import CreateUserService from '../services/CreateUserService'
import { createUserValidator } from './../middlewares/usersValidator'
import jwtAuthenticator from 'src/middlewares/jwtAuthenticator'

const usersRouter = Router()
const upload = multer(uploadConfig)

// eslint-disable-next-line prettier/prettier
usersRouter.post('/', createUserValidator, async(request, response) => {
  try {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password
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
    return response.json({ ok: true })
  }
)

export default usersRouter
