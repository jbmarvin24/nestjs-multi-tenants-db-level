import { join } from 'path';
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const ormConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'nestjs-multi-tenant',
  logging: true,
  entities: [join(__dirname, './modules/public/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/public/*{.ts,.js}')],
  migrationsRun: true,
};

// For Typeorm CLI
export const AppDataSource = new DataSource({
  ...ormConfig,
});
