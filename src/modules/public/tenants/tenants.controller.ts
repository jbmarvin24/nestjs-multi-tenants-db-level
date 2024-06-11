import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  async create(@Body() createTenantDto: CreateTenantDto) {
    return await this.tenantsService.create(createTenantDto);
  }

  @Get()
  async findAll() {
    return await this.tenantsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tenantsService.findOne(id);
  }
}
