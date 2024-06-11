import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Repository, getManager } from 'typeorm';
import { getTenantConnection } from '../../tenancy/tenancy.utils';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    const createdTenant = await this.tenantRepository.save(
      new Tenant({
        name: createTenantDto.name,
      }),
    );

    const databaseName = `tenant_${createdTenant.id}`;
    await getManager().query(`CREATE DATABASE IF NOT EXISTS ${databaseName};`);

    const connection = await getTenantConnection(createdTenant.id);
    await connection.runMigrations();
    await connection.close();

    return createdTenant;
  }

  async findAll() {
    return await this.tenantRepository.find();
  }

  async findOne(id: string) {
    return await this.tenantRepository.findOneBy({
      id,
    });
  }
}
