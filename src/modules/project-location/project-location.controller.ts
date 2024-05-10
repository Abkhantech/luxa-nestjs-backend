import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectLocationService } from './project-location.service';
  
  @ApiTags('Project-Location')
  @Controller('project-location')
  export class ProjectLocationController {
    constructor(
      private projectLocationService: ProjectLocationService,
      ) {}
      //APIs
  
  
  }
  