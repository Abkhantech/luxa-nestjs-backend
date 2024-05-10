import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'src/modules/utils/constants';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Bill payment',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Task Count',
    example: 1,
  })
  @IsNumber()
  task_count: number;

  @ApiProperty({
    description: 'Task Description',
    example: 'This is very high priority task',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Due Date of Task',
    example: '2024-12-12',
  })
  @IsNotEmpty()
  dueDate: Date;

  @ApiProperty({
    description: 'Project Id',
    example: 1,
  })
  @IsNumber()
  project_id: number;

  @ApiProperty({
    description: 'Created by',
    example: 'fghjbkgfghjhgfd45675xcghvjhg',
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    description: 'Status',
    example:TaskStatus.Pendding ,
  })
  @IsString()
  @IsOptional()
  status: TaskStatus;
}
