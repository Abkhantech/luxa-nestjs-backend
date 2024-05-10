import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProjectLocationDto {
  @ApiProperty({
    description: 'City',
    example: 'NY',
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'State',
    example: 'XYZ',
  })
  @IsString()
  state: string;

  @ApiProperty({
    description: 'Address',
    example: 'XYZ',
  })
  @IsString()
  address: string;

}
