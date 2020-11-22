import { Router } from 'express'

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController'
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController'
import { resetPasswordValidator } from '../middlewares/passwordValidator'

const passwordRouter = Router()
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

passwordRouter.post('/forgot', forgotPasswordController.create)

passwordRouter.post(
  '/reset',
  resetPasswordValidator,
  resetPasswordController.create
)

export default passwordRouter
