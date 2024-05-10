import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSuperAdminDto {
  @ApiProperty({
    description: 'Email',
    example: 'wahab.arshad@projectluxa.org',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'First Name',
    example: 'Wahab'
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    description: 'Mobile Number',
    example: '+11234567890'
  })
  @IsString()
  @IsOptional()
  mobile_number: string;

  @ApiProperty({
    description: 'Mobile Number',
    example: 'MWahab786'
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

