import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateRoleDto } from 'src/modules/role/dto/create-role.dto';

export class AddNewUserDto {
  @ApiProperty({
    description: 'user id',
    example: 'xcbnbvcvbnbv5678765fg',
  })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    description: 'project id',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  project_id: number;

  @ApiProperty({
    description: 'task_id',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  task_id: number;

  @ApiProperty({
    description: 'Email',
    example: 'wahab.arshad@projectluxa.org',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Role',
    example: [{ role_name: 'Project Manager' }],
  })
  @IsString()
  @IsNotEmpty()
  roles: CreateRoleDto[];
}
