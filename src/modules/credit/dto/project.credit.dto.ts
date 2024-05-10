import { Credit } from '../credit.entity';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateProjectCreditDto {

  @IsNumber()
  project_id: number;

  @IsOptional()
  credit: Credit;
}
