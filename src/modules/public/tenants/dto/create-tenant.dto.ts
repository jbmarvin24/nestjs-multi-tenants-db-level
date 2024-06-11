import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTenantDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
