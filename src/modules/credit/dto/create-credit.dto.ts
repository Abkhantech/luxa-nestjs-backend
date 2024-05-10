import { ApiProperty } from '@nestjs/swagger';

export class CreateCreditDto {
  @ApiProperty({
    description: 'Credit Type',
    example: '',
  })
  creditType: '';
}
