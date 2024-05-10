import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Review } from './review.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @ApiOperation({
    description: 'A successful hit can return Review',
    summary: 'Create Review',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created Review.',
    type: Review,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Single files upload with additional data',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        task_id: { type: 'string' },
        description: { type: 'string' },
        dueDate: { type: 'string', format: 'date' },
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
    
    return this.reviewService.createReview(file, body);
  }
  // @Get()
  // findAll() {
  //   return this.reviewService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reviewService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
  //   return this.reviewService.update(+id, updateReviewDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reviewService.remove(+id);
  // }
}
