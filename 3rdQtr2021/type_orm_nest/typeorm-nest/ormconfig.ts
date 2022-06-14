import {SqliteConnectionOptions} from "typeorm/driver/sqlite/SqliteConnectionOptions"

const config: SqliteConnectionOptions = {
  type: "sqlite",
  database: 'db_sqlite',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true,
  migrations: [
    'dist/src/db_sqlite/migrations/*.js'
  ],
  cli: {
    migrationsDir: 'src/db_sqlite/migrations'
  },
}

export default config;