import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { ProjectDetailService } from './project-detail.service';
import { CreateProjectDetailDto } from './dto/create-project-detail.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectDetail } from './project-detail.entity';
import { FindOptionDto } from './dto/find-option.dto';
import { CreditOptionDto } from './dto/credit-option.dto';

@ApiTags('Project Detail')
@Controller('project-detail')
export class ProjectDetailController {
  constructor(private readonly projectDetailService: ProjectDetailService) {}

  @ApiOperation({
    description: 'A successful hit can return project detail',
    summary: 'Project Detail',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully Project Detail.',
    type: ProjectDetail,
  })
  @Post()
  async create(@Body() body: CreateProjectDetailDto): Promise<ProjectDetail> {
    try {
      return this.projectDetailService.create(body);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can return Project Details',
    summary: 'Create Project Details',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully Project Details.',
    type: ProjectDetail,
  })
  @Post('/findOptions')
  async findOptions(@Body() body: FindOptionDto): Promise<ProjectDetail[]> {
    try {
      return this.projectDetailService.optionProjectDetails(
        body.project_id,
        body.rating_system_id,
        body.credit_id,
      );
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can return Project Details',
    summary: 'Get Project Details againest project Id',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully Get Project Details.',
    type: ProjectDetail,
  })
  @Get('projectDetails/:id')
  async projectDetail(@Param('id') id: string): Promise<ProjectDetail[]> {
    try {
      return this.projectDetailService.projectDetails(id);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description:
      'A successful hit can return Project Details with specific credit and option',
    summary: 'Get Project Details againest credit',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully Get Project Details.',
    type: ProjectDetail,
  })
  @Post('projectDetailsWithOption')
  async projectDetailWithOption(@Body() body: CreditOptionDto) {
    try {
      return this.projectDetailService.projectDetailWithOption(body);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }
}
