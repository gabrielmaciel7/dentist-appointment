import { injectable, inject } from 'tsyringe'
import { differenceInHours } from 'date-fns'

// import User from '@modules/users/infra/typeorm/entities/User'

import getMessage from '@shared/services/GetMessageService'
import AppError from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError(getMessage('users.reset_password.token.not_exists'))
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError(getMessage('users.reset_password.user.not_exists'))
    }

    const tokenExpirationHours = 2
    const tokenCreatedAt = userToken.created_at

    if (differenceInHours(Date.now(), tokenCreatedAt) > tokenExpirationHours) {
      throw new AppError(getMessage('users.reset_password.token.expired'))
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.usersRepository.save(user)
  }
}

export default ResetPasswordService
