import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Name',
    example: 'Google',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Industry Type',
    example: 'XYZ',
  })
  @IsString()
  @IsNotEmpty()
  industry_type: string;

  @ApiProperty({
    description: 'Address',
    example: 'XYZ',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Business Phone Number',
    example: '+11234567890',
  })
  @IsString()
  business_phone_number: string;
}

