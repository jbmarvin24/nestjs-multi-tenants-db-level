import { BadRequestException, Global, Module, Scope } from '@nestjs/common';
import { CONNECTION } from './tenancy.symbols';
import { Request as ExpressRequest } from 'express';
import { getTenantConnection } from './tenancy.utils';
import { REQUEST } from '@nestjs/core';

const connectionFactory = {
  provide: CONNECTION,
  scope: Scope.REQUEST,
  useFactory: (request: ExpressRequest) => {
    const { tenantId } = request;
    console.log(tenantId);

    if (tenantId) {
      return getTenantConnection(tenantId);
    } else {
      throw new BadRequestException('Tenant Id is required in headers');
    }
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [connectionFactory],
  exports: [CONNECTION],
})
export class TenancyModule {}
