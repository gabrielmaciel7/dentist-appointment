import { Request, Response, NextFunction } from 'express'
import joi from '@hapi/joi'

import { getValidatorError } from '@shared/services/GetMessageService'
import AppError from '@shared/errors/AppError'

const rules = {
  token: joi.string().uuid(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(),
  password_confirmation: joi.string().valid(joi.ref('password')).required()
}

const options = { abortEarly: false }

export const resetPasswordValidator = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response<JSON> => {
  const { token, password, password_confirmation } = request.body

  const schema = joi.object({
    token: rules.token,
    password: rules.password,
    password_confirmation: rules.password_confirmation
  })

  const { error } = schema.validate(
    { token, password, password_confirmation },
    options
  )

  if (error) {
    throw new AppError(getValidatorError(error, 'users.create'))
  }

  next()
}
