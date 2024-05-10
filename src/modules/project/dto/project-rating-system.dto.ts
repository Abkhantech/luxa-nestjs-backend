import { ApiProperty } from '@nestjs/swagger';
import { IsNumber} from 'class-validator';
import { Rating_System } from 'src/modules/utils/constants';

export class ProjectRatingSystemDto {
  @ApiProperty({
    description: 'Project Id',
    example: 1,
  })
  @IsNumber()
  project_id: number;

  @ApiProperty({
    description: 'RatingSystem Type',
    example: Rating_System.LEED_BD_C_Core_and_Shell,
  })
  rating_system: Rating_System;
}
