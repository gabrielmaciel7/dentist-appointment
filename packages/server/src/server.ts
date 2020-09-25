import 'reflect-metadata'
import dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'

import routes from './routes'

import './database'
import uploadConfig from './config/upload'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
