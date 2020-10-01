import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import User from '../models/User'

import getMessage from './GetMessageService'
import AppError from '../errors/AppError'

interface Request {
  name: string
  email: string
  password: string
  avatar: string | null
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    avatar
  }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const checkUserExists = await usersRepository.findOne({
      where: { email }
    })

    if (checkUserExists) {
      throw new AppError(getMessage('users.create.email.already_used'))
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar
    })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService
