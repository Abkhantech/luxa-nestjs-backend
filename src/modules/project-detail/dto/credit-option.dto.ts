import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreditOptionDto {
  @ApiProperty({
    description: 'Project Id',
    example: 1,
  })
  @IsNumber()
  project_id: number;

  @ApiProperty({
    description: 'credit Type',
    example: '',
  })
  @IsString()
  creditType: string;
}
