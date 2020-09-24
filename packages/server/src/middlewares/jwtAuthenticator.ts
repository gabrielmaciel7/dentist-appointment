import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '../config/auth'

import getMessage from 'src/services/GetMessageService'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function jwtAuthenticator(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error(getMessage('jwt.auth.missing'))
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)
    const { sub } = decoded as TokenPayload

    request.user = {
      id: sub
    }

    return next()
  } catch {
    throw new Error(getMessage('jwt.auth.invalid'))
  }
}
