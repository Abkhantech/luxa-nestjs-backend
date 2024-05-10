import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateRoleDto } from 'src/modules/role/dto/create-role.dto';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Username',
    example: 'wahab.arshad',
  })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({
    description: 'Trade Type',
    example: 'XYZ',
  })
  @IsString()
  @IsOptional()
  trade_type: string;

  @ApiProperty({
    description: 'Credentials',
    example: 'XYZ',
  })
  @IsString()
  @IsOptional()
  credentials: string;

  @ApiProperty({
    description: 'First Name',
    example: 'Wahab',
  })
  @IsString()
  @IsOptional()
  full_name: string;

  @ApiProperty({
    description: 'Mobile Number',
    example: '+11234567890',
  })
  @IsString()
  @IsOptional()
  mobile_number: string;

  @ApiProperty({
    description: 'Password',
    example: 'MWahab786',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Confirm Password',
    example: 'MWahab786',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

}
