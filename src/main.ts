import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { tenancyMiddleware } from './modules/tenancy/tenancy.middleware';
import { getTenantConnection } from './modules/tenancy/tenancy.utils';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(tenancyMiddleware);
  const appSource = app.get(DataSource);

  const databases = await appSource.query<{ name: string }[]>(
    "SELECT schema_name `name` FROM  information_schema.schemata WHERE schema_name LIKE 'tenant_%';",
  );

  for (const database of databases) {
    const tenantId = database.name.replace('tenant_', '');
    const tenantDataSource = await getTenantConnection(tenantId);
    await tenantDataSource.runMigrations();
    await tenantDataSource.destroy();
  }

  await app.listen(3000);
  console.log(`🚀 Application is running on: http://localhost:3000`);
}
bootstrap();
