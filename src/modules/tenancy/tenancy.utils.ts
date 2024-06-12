import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { tenantOrmConfig } from '../../tenants-orm.config';

const dataSources: { [key: string]: DataSource } = {};

export async function getTenantConnection(tenantId: string) {
  const databaseName = `tenant_${tenantId}`;

  if (dataSources[databaseName]) {
    const dataSource = dataSources[databaseName];
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    return dataSource;
  }

  const newDataSource = new DataSource({
    ...(tenantOrmConfig as MysqlConnectionOptions),
    database: databaseName,
  });

  dataSources[databaseName] = newDataSource;
  await newDataSource.initialize();
  return newDataSource;
}
