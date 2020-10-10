import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'

import User from '@modules/users/infra/typeorm/entities/User'
import ITokenProvider from '../models/ITokenProvider'

export default class JwtTokenProvider implements ITokenProvider {
  public async generateToken(user: User): Promise<string> {
    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return token
  }
}
