import 'reflect-metadata'
import dotenv from 'dotenv'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'

import routes from './routes'

import '@shared/infra/typeorm'
import '@shared/container'

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import getMessage from '@shared/services/GetMessageService'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: getMessage('server.internal_error')
  })
})

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
