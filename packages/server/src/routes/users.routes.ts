/* eslint-disable camelcase */
import { Router } from 'express'

import CreateUserService from '../services/CreateUserService'
import { createUserValidator } from './../middlewares/usersValidator'

const usersRouter = Router()

// eslint-disable-next-line prettier/prettier
usersRouter.post('/', createUserValidator, async(request, response) => {
  try {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password
    })

    delete user.password

    return response.json(user)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

export default usersRouter
