import { ApiProperty } from '@nestjs/swagger';
import { CertificationType, RatingType } from 'src/modules/utils/constants';

export class CreateCertificationDto {

  @ApiProperty({
    description: 'Certification Type',
    example: RatingType.Certified
  })
  certificationType:RatingType
}

