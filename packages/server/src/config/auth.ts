import dotenv from 'dotenv'
dotenv.config()

export default {
  jwt: {
    secret: process.env.JWT_PRIVATE_KEY,
    expiresIn: '1d'
  }
}
