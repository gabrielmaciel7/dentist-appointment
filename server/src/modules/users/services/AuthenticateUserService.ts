import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'

import getMessage from '@shared/services/GetMessageService'
import AppError from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import ITokenProvider from '../providers/TokenProvider/models/ITokenProvider'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError(getMessage('users.auth.invalid'), 401)
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!passwordMatched) {
      throw new AppError(getMessage('users.auth.invalid'), 401)
    }

    const token = await this.tokenProvider.generateToken(user)

    return { user, token }
  }
}

export default AuthenticateUserService
