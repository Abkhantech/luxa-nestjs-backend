import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { TaskStatus } from "src/modules/utils/constants";

export class UpdateTaskDto  {
  @ApiProperty({
    description: 'Status',
    example:TaskStatus.Pendding ,
  })
  @IsString()
  @IsOptional()
  status: TaskStatus;
}
