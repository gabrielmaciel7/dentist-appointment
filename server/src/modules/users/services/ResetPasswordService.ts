import { injectable, inject } from 'tsyringe'

// import User from '@modules/users/infra/typeorm/entities/User'

import getMessage from '@shared/services/GetMessageService'
import AppError from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'

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
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError(
        getMessage('users.forgot.reset_password.token.not_exists')
      )
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError(
        getMessage('users.forgot.reset_password.user.not_exists')
      )
    }

    user.password = password

    await this.usersRepository.save(user)
  }
}

export default ResetPasswordService
