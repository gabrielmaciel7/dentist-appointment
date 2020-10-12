import { injectable, inject } from 'tsyringe'

import getMessage from '@shared/services/GetMessageService'
import AppError from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError(getMessage('users.forgot.not_exists'))
    }

    const { token } = await this.userTokensRepository.generate(user.id)

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[Whiteeth] Password recovery',
      templateData: {
        template: 'Hello, {{name}}. Your token is: {{token}}',
        variables: {
          name: user.name,
          token
        }
      }
    })
  }
}

export default SendForgotPasswordEmailService
