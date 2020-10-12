import { injectable, inject } from 'tsyringe'

// import User from '@modules/users/infra/typeorm/entities/User'

import getMessage from '@shared/services/GetMessageService'
import AppError from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (!checkUserExists) {
      throw new AppError(getMessage('users.forgot.not_exists'))
    }

    this.mailProvider.sendMail(email, 'Password recovery message.')
  }
}

export default SendForgotPasswordEmailService
