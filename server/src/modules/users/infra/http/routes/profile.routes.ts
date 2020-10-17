import { Router } from 'express'

import ProfileController from '@modules/users/infra/http/controllers/ProfileController'

// import { createUserValidator } from '@modules/users/infra/http/middlewares/usersValidator'
import jwtAuthenticator from '@modules/users/infra/http/middlewares/jwtAuthenticator'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(jwtAuthenticator)

profileRouter.get('/', profileController.show)
profileRouter.put('/', profileController.update)

export default profileRouter
