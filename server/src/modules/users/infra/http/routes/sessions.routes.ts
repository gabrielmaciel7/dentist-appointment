/* eslint-disable prettier/prettier */
import { Router } from 'express'

import SessionsController from '@modules/users/infra/http/controllers/SessionsController'
import { authenticateUserValidator } from '@modules/users/infra/http/middlewares/usersValidator'

const sessionsRouter = Router()
const sessionsController = new SessionsController()

sessionsRouter.post('/', authenticateUserValidator, sessionsController.create)

export default sessionsRouter
