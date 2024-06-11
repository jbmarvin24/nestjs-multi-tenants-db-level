import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './modules/public/tenants/tenants.module';

@Module({
  imports: [TenantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
