import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateProjectLocationDto } from 'src/modules/project-location/dto/create-project-location.dto';

export class AssignProjectDto {
  @ApiProperty({
    description: 'Project Id',
    example: 1,
  })
  @IsNumber()
  project_id: number;

  @ApiProperty({
    description: 'User Id',
    example: 1,
  })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: 'User Id',
    example: 'abc',
  })
  @IsString()
  previous_user_id: string;
}
