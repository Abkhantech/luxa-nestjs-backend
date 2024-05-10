import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateProjectLocationDto } from 'src/modules/project-location/dto/create-project-location.dto';

export class UpdateProjectDto {
  @ApiProperty({
    description: 'User Canonical Id',
    example: '79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be',
  })
  @IsString()
  user_canonical_id: string;
  
  @ApiProperty({
    description: 'Project Name',
    example: 'WeMove-Ai',
  })
  @IsString()
  project_name: string;

  @ApiProperty({
    description: 'Project Type',
    example: 'XYZ',
  })
  @IsString()
  project_type: string;

  @ApiProperty({
    description: 'Project Size',
    example: 20,
  })
  @IsNumber()
  project_size: number;

  @ApiProperty({
    description: 'Budget',
    example: 20,
  })
  @IsNumber()
  budget: number;

  @ApiProperty({
    description: 'No Of Floors',
    example: 2,
  })
  @IsNumber()
  no_of_floors: number;

  @ApiProperty({
    description: 'Project Start Date',
    example: '2023-01-26T12:00:00Z',
  })
  @IsNumber()
  project_start_date: Date;

  @ApiProperty({
    description: 'Estimated End Date',
    example: '2023-01-26T12:00:00Z',
  })
  @IsNumber()
  estimated_end_date: Date;

  @ApiProperty({
    description: 'Substantial Complete Date',
    example: '2023-01-26T12:00:00Z',
  })
  @IsNumber()
  substantial_complete_date: Date;

}
