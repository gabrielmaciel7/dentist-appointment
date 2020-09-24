/* eslint-disable prettier/prettier */
import { Router } from 'express'

import AuthenticateUserService from '../services/AuthenticateUserService'
import { authenticateUserValidator } from './../validators/usersValidator'

const sessionsRouter = Router()

// eslint-disable-next-line prettier/prettier
sessionsRouter.post('/', authenticateUserValidator, async(request, response) => {
  try {
    const { email, password } = request.body

    const authenticateUser = new AuthenticateUserService()

    const { user, token } = await authenticateUser.execute({
      email,
      password
    })

    delete user.password

    return response.json({ user, token })
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
}
)

export default sessionsRouter
