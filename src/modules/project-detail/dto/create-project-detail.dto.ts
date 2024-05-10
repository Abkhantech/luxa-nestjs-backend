import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateProjectDetailDto {
  @ApiProperty({
    description: 'Project Id',
    example: 1,
  })
  @IsNumber()
  project_id: number;

  @ApiProperty({
    description: 'Credit Id',
    example: 1,
  })
  @IsNumber()
  credit_id: number;

  @ApiProperty({
    description: 'Option Id',
    example: 1,
  })
  @IsNumber()
  option_id: number;

  @ApiProperty({
    description: 'Rating System Id',
    example: 1,
  })
  @IsNumber()
  rating_system_id: number;

  @ApiProperty({
    description: 'Point',
    example: 1,
  })
  @IsNumber()
  point: number;
}
