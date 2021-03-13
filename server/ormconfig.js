module.exports = [
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
    },
    ////PROD
    // ssl: true,
    // ssl: {
    //   rejectUnauthorized: false,
    // }
  },
  {
    name: 'mongo',
    type: 'mongodb',
    url: process.env.TYPEORM_MONGODB_URI,
    useUnifiedTopology: true,
    entities: [process.env.TYPEORM_MONGODB_ENTITIES]
  }
]