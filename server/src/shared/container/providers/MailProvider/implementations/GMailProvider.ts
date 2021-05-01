import nodemailer, { Transporter } from 'nodemailer'
import { injectable, inject } from 'tsyringe'

import mailConfig from '@config/mail'

import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider'

@injectable()
class GMailProvider implements IMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    const transporter = nodemailer.createTransport(
      `smtps://${process.env.GMAIL_EMAIL}:` +
        encodeURIComponent(process.env.GMAIL_PASS) +
        '@smtp.gmail.com:465'
    )

    this.client = transporter
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.default.from

    const message = await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export default GMailProvider
