import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { DataSource, Repository } from 'typeorm';
import { tenantOrmConfig } from '../../../tenants-orm.config';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    const createdTenant = await this.tenantRepository.save(
      new Tenant({
        name: createTenantDto.name,
      }),
    );

    const databaseName = `tenant_${createdTenant.id}`;

    await this.dataSource.query(
      `CREATE DATABASE IF NOT EXISTS \`${databaseName}\``,
    );

    const tenantDataSource = new DataSource({
      ...tenantOrmConfig,
      database: databaseName,
    });

    await tenantDataSource.initialize();
    await tenantDataSource.runMigrations();
    await tenantDataSource.destroy();

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
