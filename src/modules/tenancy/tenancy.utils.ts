import {
  Connection,
  DataSource,
  createConnection,
  getConnectionManager,
} from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { tenantOrmConfig } from '../../tenants-orm.config';

// export function getTenantConnection(tenantId: string): Promise<Connection> {
//   const connectionName = `tenant_${tenantId}`;
//   const connectionManager = getConnectionManager();

//   if (connectionManager.has(connectionName)) {
//     const connection = connectionManager.get(connectionName);
//     return Promise.resolve(
//       connection.isConnected ? connection : connection.connect(),
//     );
//   }

//   return createConnection({
//     ...(tenantOrmConfig as MysqlConnectionOptions),
//     name: connectionName,
//     database: connectionName,
//   });
// }

export function getTenantConnection(tenantId: string) {
  const databaseName = `tenant_${tenantId}`;
  const dataSource = new DataSource({
    ...(tenantOrmConfig as MysqlConnectionOptions),
    database: databaseName,
  });

  console.log('dataSource.isInitialized:', dataSource.isInitialized);

  return Promise.resolve(
    dataSource.isInitialized ? dataSource : dataSource.initialize(),
  );
}
