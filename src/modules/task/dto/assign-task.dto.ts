import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber} from 'class-validator';
import { User } from 'src/modules/user/user.entity';


export class AssignTaskDto {
  @ApiProperty({
    description: 'Assignee',
    example: null,
  })
  @IsNotEmpty()
  assigned_user: User;

  @ApiProperty({
    description: 'Task id',
    example: 1,
  })
  @IsNumber()
  task_id: number;
  
  @ApiProperty({
    description: 'Project Id',
    example: 1,
  })
  @IsNumber()
  project_id: number;
  
}
