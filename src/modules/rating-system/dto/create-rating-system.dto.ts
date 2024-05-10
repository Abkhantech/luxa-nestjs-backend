import { ApiProperty } from '@nestjs/swagger';
import { Rating_System } from 'src/modules/utils/constants';

export class CreateRatingSystemDto {
  @ApiProperty({
    description: 'RatingSystem Type',
    example: Rating_System.LEED_BD_C_Core_and_Shell,
  })
  rating_system: Rating_System;
}
