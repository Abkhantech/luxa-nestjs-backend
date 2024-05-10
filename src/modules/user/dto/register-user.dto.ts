import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateRoleDto } from 'src/modules/role/dto/create-role.dto';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Admin id',
    example: '0987345ugfnmnbvfty98767898765r678',
  })
  @IsNumber()
  @IsNotEmpty()
  admin_id: string;

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

  // @ApiProperty({
  //   description: 'First Name',
  //   example: 'Wahab',
  // })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  // @ApiProperty({
  //   description: 'Mobile Number',
  //   example: '+11234567890',
  // })
  @IsString()
  @IsOptional()
  mobile_number: string;

  // @ApiProperty({
  //   description: 'Mobile Number',
  //   example: 'MWahab786'
  // })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Role',
    example: [{ role_name: 'Project Manager' }],
  })
  @IsString()
  @IsNotEmpty()
  roles: CreateRoleDto[];
}
