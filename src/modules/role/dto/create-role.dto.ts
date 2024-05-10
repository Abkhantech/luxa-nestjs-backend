import { ApiProperty } from "@nestjs/swagger";
import { Roles } from "src/modules/utils/constants";


export class CreateRoleDto {

  @ApiProperty({
    description: 'Role name',
    example: 'Manager'
  })
  role_name: Roles;
}
