import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './modules/public/tenants/tenants.module';
import { CatsModule } from './modules/tenanted/cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm.config';
import { TenancyModule } from './modules/tenancy/tenancy.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TenancyModule,
    TenantsModule,
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
