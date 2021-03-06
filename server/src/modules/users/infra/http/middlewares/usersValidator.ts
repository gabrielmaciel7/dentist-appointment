import { Request, Response, NextFunction } from 'express'
import joi from '@hapi/joi'

import { getValidatorError } from '@shared/services/GetMessageService'
import AppError from '@shared/errors/AppError'

const rules = {
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(),
  password_confirmation: joi.string().valid(joi.ref('password')).required()
}

const options = { abortEarly: false }

export const createUserValidator = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response<JSON> => {
  const { name, email, password, password_confirmation } = request.body

  const schema = joi.object({
    name: rules.name,
    email: rules.email,
    password: rules.password,
    password_confirmation: rules.password_confirmation
  })

  const { error } = schema.validate(
    { name, email, password, password_confirmation },
    options
  )

  if (error) {
    throw new AppError(getValidatorError(error, 'users.create'))
  }

  next()
}

export const authenticateUserValidator = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response<JSON> => {
  const { email, password } = request.body

  const schema = joi.object({
    email: rules.email,
    password: rules.password
  })

  const { error } = schema.validate({ email, password }, options)

  if (error) {
    throw new AppError(getValidatorError(error, 'users.auth'))
  }

  next()
}
