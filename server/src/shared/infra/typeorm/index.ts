import { createConnections } from 'typeorm'

createConnections([
  {
    name: 'default',
    type: 'postgres',
    host: process.env.TYPEORM_POSTGRES_HOST,
    port: Number(process.env.TYPEORM_POSTGRES_PORT),
    username: process.env.TYPEORM_POSTGRES_USERNAME,
    password: process.env.TYPEORM_POSTGRES_PASSWORD,
    database: process.env.TYPEORM_POSTGRES_DATABASE,
    entities: [process.env.TYPEORM_POSTGRES_ENTITIES],
    migrations: [process.env.TYPEORM_POSTGRES_MIGRATIONS],
    cli: {
      migrationsDir: process.env.TYPEORM_POSTGRES_MIGRATIONS_DIR
    }
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: process.env.TYPEORM_MONGODB_HOST,
    port: Number(process.env.TYPEORM_MONGODB_PORT),
    username: process.env.TYPEORM_MONGODB_USERNAME,
    password: process.env.TYPEORM_MONGODB_PASSWORD,
    database: process.env.TYPEORM_MONGODB_DATABASE,
    useUnifiedTopology: true,
    entities: [process.env.TYPEORM_MONGODB_ENTITIES]
  }
])
