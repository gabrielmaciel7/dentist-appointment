import { Router } from 'express'

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'
import jwtAuthenticator from '@modules/users/infra/http/middlewares/jwtAuthenticator'

const providersRouter = Router()
const providersController = new ProvidersController()

providersRouter.use(jwtAuthenticator)

providersRouter.get('/', providersController.index)

export default providersRouter
