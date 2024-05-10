import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project-dto';
import { CurrentUser } from '../utils/user-decorator';
import { JwtAuthGuard } from '../utils/auth/auth-guards/jwt-auth.guard';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UpdateProjectDto } from './dto/update-project-dto';
import { AssignProjectDto } from './dto/assign-project.dto';
import { ProjectUser } from '../project-user/project-user.entity';
import { ProjectRatingSystemDto } from './dto/project-rating-system.dto';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private userService: UserService,
  ) {}
  @ApiOperation({
    description: 'A successful hit can return project object',
    summary: 'Create Project',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created user.',
    type: Project,
  })
  @Post()
  // @ApiBearerAuth(process.env.X_ACCESS_TOKEN)
  // @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateProjectDto): Promise<Project> {
    try {
      const user1 = await this.userService.findUserByCid(
        body.user_canonical_id,
      );
      if (this.projectService.hasDesiredRoles(user1.roles)) {
        return this.projectService.create(body, user1);
      } else {
        throw new UnauthorizedException(
          'Only Project Manager or Sub Contractor are allowed to create project',
        );
      }
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can Assign Project',
    summary: 'Assign Project',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully Assign Project.',
    type: Project,
  })
  @Post('/assignProject')
  // @ApiBearerAuth(process.env.X_ACCESS_TOKEN)
  // @UseGuards(JwtAuthGuard)
  async assignProject(@Body() body: AssignProjectDto): Promise<ProjectUser> {
    try {
      return this.projectService.assignProject(body)
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can return All project',
    summary: 'Get All Project',
  })
  @ApiResponse({
    status: 201,
    description: 'Get All Projects.',
    type: Project,
  })
  @Get()
  async getAllProjects(): Promise<Project[]> {
    try {
      return this.projectService.getAllProjects();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can return All project againest user',
    summary: 'Get All Project Againest User',
  })
  @ApiResponse({
    status: 201,
    description: 'Get All Projects Againest User.',
    type: Project,
  })
  @Get('getProjectAgainestCompany/:id')
  async getProjectAgainestUser(@Param('id') id: number): Promise<Project[]> {
    try {
      return this.projectService.getProjectAgainestCompany(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can return project againest id',
    summary: 'Get All Project Againest id',
  })
  @ApiResponse({
    status: 201,
    description: 'Get All Project Againest id.',
    type: Project,
  })
  @Get(':id')
  async getProject(@Param('id') id: number): Promise<Project> {
    try {
      return this.projectService.findOne(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can return project object',
    summary: 'Attach RatingSystem to Project',
  })
  @ApiResponse({
    status: 201,
    description: 'Attach RatingSystem to Project',
    type: Project,
  })
  @Post('/attachRatingSystem')
  async attachRatingSystemProject(@Body() body: ProjectRatingSystemDto): Promise<Project> {
    try {
      return this.projectService.attachRatingSystem(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can return project against id',
    summary: 'Update project Against Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully update project against id.',
    type: Project,
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateProjectDto,
  ): Promise<Project> {
    try {
      const user1 = await this.userService.findUserByCid(
        body.user_canonical_id,
      );
      if (this.projectService.hasDesiredRoles(user1.roles)) {
        return this.projectService.update(+id, body);
      } else {
        throw new UnauthorizedException(
          'Only Project Manager or Sustainability Manager are allowed to create project',
        );
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }



}
