import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreateCreditDto } from './dto/create-credit.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Credit } from './credit.entity';
import { CreateProjectCreditDto } from './dto/project.credit.dto';
import { Project } from '../project/project.entity';

@ApiTags('Credit')
@Controller('credit')
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  @ApiOperation({
    description: 'A successful hit can create Credit',
    summary: 'Create Credit',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created Credit.',
    type: Credit,
  })
  @Post()
  async create(@Body() body: CreateCreditDto): Promise<Credit> {
    try {
      return this.creditService.createCredit(body);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can Get ALL Credits',
    summary: 'Get ALL Credits',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully Get ALL Credits.',
    type: Credit,
  })
  @Get()
  async getALLCredits(): Promise<Credit[]> {
    try {
      return this.creditService.getALLCredits();
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'Get Credit By Id',
    summary: 'Get Credit By ID',
  })
  @ApiResponse({ status: 200, description: 'Get successfuly' })
  @Get(':id')
  async getCredit(@Param('id') id: string): Promise<Credit> {
    try {
      return this.creditService.findCreditById(+id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
