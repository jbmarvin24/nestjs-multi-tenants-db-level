import { Inject, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { CONNECTION } from '../../tenancy/tenancy.symbols';

@Injectable()
export class CatsService {
  private readonly catRepository: Repository<Cat>;

  constructor(@Inject(CONNECTION) datasource: DataSource) {
    this.catRepository = datasource.getRepository(Cat);
  }

  async create(createCatDto: CreateCatDto) {
    return await this.catRepository.save(
      new Cat({
        ...createCatDto,
      }),
    );
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: string) {
    return await this.catRepository.findOneBy({ id });
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    const cat = await this.catRepository.findOneByOrFail({ id });

    return await this.catRepository.save(
      new Cat({
        ...cat,
        ...updateCatDto,
      }),
    );
  }

  async remove(id: string) {
    const cat = await this.catRepository.findOneByOrFail({ id });

    await this.catRepository.softDelete(cat.id);
  }
}
