import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../../abstract.entity';

@Entity()
export class Tenant extends AbstractEntity {
  constructor(partial: Partial<Tenant>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: 'nvarchar', length: 100 })
  name: string;
}
