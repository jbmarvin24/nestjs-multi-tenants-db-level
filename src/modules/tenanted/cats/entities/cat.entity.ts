import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../../abstract.entity';

@Entity()
export class Cat extends AbstractEntity {
  constructor(partial?: Partial<Cat>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  name: string;
}
