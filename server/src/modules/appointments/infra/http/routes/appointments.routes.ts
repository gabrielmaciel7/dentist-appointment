import { Router } from 'express'

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController'
import jwtAuthenticator from '@modules/users/infra/http/middlewares/jwtAuthenticator'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()

appointmentsRouter.use(jwtAuthenticator)

appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter
