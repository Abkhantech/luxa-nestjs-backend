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
import { CompanyService } from './company.service';
  
  @ApiTags('Company')
  @Controller('company')
  export class CompanyController {
    constructor(
      private companyService: CompanyService,
      ) {}
      //APIs
  
  
  }
  