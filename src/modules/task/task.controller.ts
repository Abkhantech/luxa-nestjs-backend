import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  Patch,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { TaskService } from './task.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Task } from './task.entity';
import { AssignTaskDto } from './dto/assign-task.dto';
import { TaskStatus } from '../utils/constants';
import { UpdateTaskDto } from './dto/update-task.dto';


@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({
    description: 'A successful hit can return Task',
    summary: 'Create Task',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created Task.',
    type: Task,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Single files upload with additional data',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        dueDate: { type: 'string', format: 'date' },
        project_id: { type: 'number' },
        user_id: { type: 'string' },
        status: { type: 'string', enum: Object.values(TaskStatus) },
        task_credit: { type: 'string' },
        task_option: { type: 'string' },
        input_file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'input_file', maxCount: 1 }]))
  async create(
    @UploadedFiles()
    file: {
      input_file?: any;
    },
    @Body() body: any,
  ): Promise<Task> {
    
    return this.taskService.createTask(file, body);
  }

  @ApiOperation({
    description: 'A successful hit can return assigned Task',
    summary: 'Assign Task',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully Assigned Task.',
    type: Task,
  })
  @Post('/assignTask')
  async assignTask(@Body() body: AssignTaskDto): Promise<Task> {
    return this.taskService.assignTask(body);
  }

  @ApiOperation({
    description: 'A successful hit can return all Tasks',
    summary: 'Get All Tasks',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully get Tasks.',
    type: Task,
  })
  @Get('allProjectTask/:id')
  async findAll(@Param('id') id: string) : Promise<Task[]>{
    return this.taskService.findAll(+id);
  }

  @ApiOperation({
    description: 'A successful hit can return all Task againest id',
    summary: 'Get Task Againest Id',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully get Task.',
    type: Task,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOneWithCid(id);
  }

  @ApiOperation({
    description: 'Updates the status of an existing task',
    summary: 'Update Task Status',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated task status.',
    type: Task,
  })
  @Patch(':id')
  async updateTaskStatus(@Param('id') id: string, @Body() body: UpdateTaskDto): Promise<Task> {
    return this.taskService.updateStatus(+id, body)
  }


  @ApiOperation({
    description: 'Updates the status of an existing task',
    summary: 'Update Task Status',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated task status.',
    type: Task,
  })
  @Patch(':id/updateStatus')
  async updateTaskStatusDynamiclly(@Param('id') id: string, @Body() body: UpdateTaskDto): Promise<Task> {
    return this.taskService.updateTaskStatus(id, body)
  }

  
}
