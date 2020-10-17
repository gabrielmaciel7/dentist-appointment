import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import getMessage from '@shared/services/GetMessageService'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import User from '@modules/users/infra/typeorm/entities/User'

interface IRequest {
  user_id: string
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError(getMessage('profile.show.user.not_found'))
    }

    return user
  }
}

export default ShowProfileService
