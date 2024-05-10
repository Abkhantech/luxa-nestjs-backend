import { ApiProperty } from '@nestjs/swagger';
import { Credit_Category } from 'src/modules/utils/constants';

export class CreateCreditCategoryDto {
  @ApiProperty({
    description: 'CreditCategory',
    example: Credit_Category.EnergyAndAtmosphere,
  })
  credit_category: Credit_Category;
}
