import { string } from '@hapi/joi'

interface IMailConfig {
  driver: 'ethereal' | 'ses'

  default: {
    from: {
      name: string
      email: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  default: {
    from: {
      name: 'Whiteeth',
      email: 'adm@whiteeth.com'
    }
  }
} as IMailConfig
