/* eslint-disable camelcase */
import { Request, Response, NextFunction } from 'express'
import joi from '@hapi/joi'

import { getValidatorError } from 'src/services/GetMessageService'

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
  try {
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
      throw new Error(getValidatorError(error, 'users.create'))
    }

    next()
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
}

export const authenticateUserValidator = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response<JSON> => {
  try {
    const { email, password } = request.body

    const schema = joi.object({
      email: rules.email,
      password: rules.password
    })

    const { error } = schema.validate({ email, password }, options)

    if (error) {
      throw new Error(getValidatorError(error, 'users.auth'))
    }

    next()
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
}
