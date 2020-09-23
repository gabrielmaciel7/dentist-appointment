import { createConnection } from 'typeorm'

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'docker',
  database: 'dentist-appointment'
})
