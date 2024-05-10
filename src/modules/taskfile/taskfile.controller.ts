import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { TaskfileService } from './taskfile.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Taskfile } from './taskfile.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Task File')
@Controller('taskfile')
export class TaskfileController {
  constructor(private readonly taskfileService: TaskfileService) {}

  @ApiOperation({
    description: 'A successful hit can return TaskFile',
    summary: 'Create TaskFile',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created Task.',
    type: Taskfile,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Single files upload with additional data',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        description: { type: 'string' },
        task_id: { type: 'number' },
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
  ): Promise<any> {
    return this.taskfileService.createTaskFile(file, body);
  }
}
