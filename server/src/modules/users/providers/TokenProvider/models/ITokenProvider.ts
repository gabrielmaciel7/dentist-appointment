import User from '@modules/users/infra/typeorm/entities/User'

export default interface ITokenProvider {
  generateToken(user: User): Promise<string>
}
