import { Router } from 'express'

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController'
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController'

import jwtAuthenticator from '@modules/users/infra/http/middlewares/jwtAuthenticator'

const providersRouter = Router()

const providersController = new ProvidersController()
const providerAppointmentsController = new ProviderAppointmentsController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()

providersRouter.use(jwtAuthenticator)

providersRouter.get('/', providersController.index)

providersRouter.get('/me', providerAppointmentsController.index)

providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index
)
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index
)

export default providersRouter
