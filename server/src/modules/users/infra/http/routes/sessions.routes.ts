/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import { authenticateUserValidator } from '@modules/users/infra/http/middlewares/usersValidator'

const sessionsRouter = Router()

sessionsRouter.post('/', authenticateUserValidator, async (request, response) => {
  const { email, password } = request.body

  const authenticateUser = container.resolve(AuthenticateUserService)

  const { user, token } = await authenticateUser.execute({
    email,
    password
  })

  delete user.password

  return response.json({ user, token })
}
)

export default sessionsRouter
