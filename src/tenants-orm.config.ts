import { join } from 'path';
import { ormConfig } from './orm.config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const tenantOrmConfig: MysqlConnectionOptions = {
  ...ormConfig,
  entities: [join(__dirname, './modules/tenanted/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/tenanted/*{.ts,.js}')],
};
