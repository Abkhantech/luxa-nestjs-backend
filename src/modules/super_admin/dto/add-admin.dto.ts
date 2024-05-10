import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateCompanyDto } from 'src/modules/company/dto/create-company.dto';

export class AddAdminDto {
  @ApiProperty({
    description: 'Email',
    example: 'wahab.arshad@projectluxa.org',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  // @ApiProperty({
  //   description: 'Trade Type',
  //   example: 'XYZ',
  // })
  @IsString()
  @IsNotEmpty()
  trade_type: string;

  // @ApiProperty({
  //   description: 'Credentials',
  //   example: 'XYZ',
  // })
  @IsString()
  @IsNotEmpty()
  credentials: string;

  //   @ApiProperty({
  //   description: 'First Name',
  //   example: 'Wahab'
  // })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  // @ApiProperty({
  //   description: 'Mobile Number',
  //   example: '+11234567890'
  // })
  @IsString()
  @IsOptional()
  mobile_number: string;

  @ApiProperty({
    description: 'Mobile Number',
    example: {
      name:'Google',
      industry_type:'XYZ',
      address:'XYZ',
      business_phone_number:'+11234567890'

    }
  })
  company:CreateCompanyDto;

}

