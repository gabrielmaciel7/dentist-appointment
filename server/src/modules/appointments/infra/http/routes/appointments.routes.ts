import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController'
import jwtAuthenticator from '@modules/users/infra/http/middlewares/jwtAuthenticator'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()

appointmentsRouter.use(jwtAuthenticator)

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date()
    }
  }),
  appointmentsController.create
)

export default appointmentsRouter
