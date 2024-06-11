import { Connection, createConnection, getConnectionManager } from 'typeorm';
import * as tenantOrmConfig from '../../tenants-orm.config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export function getTenantConnection(tenantId: string): Promise<Connection> {
  const connectionName = `tenant_${tenantId}`;
  const connectionManager = getConnectionManager();

  if (connectionManager.has(connectionName)) {
    const connection = connectionManager.get(connectionName);
    return Promise.resolve(
      connection.isConnected ? connection : connection.connect(),
    );
  }

  return createConnection({
    ...(tenantOrmConfig as MysqlConnectionOptions),
    name: connectionName,
    database: connectionName,
  });
}
