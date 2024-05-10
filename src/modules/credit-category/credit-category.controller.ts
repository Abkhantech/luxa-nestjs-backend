import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { CreditCategoryService } from './credit-category.service';
import { CreateCreditCategoryDto } from './dto/create-credit-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreditCategory } from './credit-category.entity';

@ApiTags('Credit Category')
@Controller('credit-category')
export class CreditCategoryController {
  constructor(private readonly creditCategoryService: CreditCategoryService) {}


  @ApiOperation({
    description: 'A successful hit can create CreditCategory',
    summary: 'Create CreditCategory',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created CreditCategory.',
    type: CreditCategory,
  })
  @Post()
  async create(@Body() body: CreateCreditCategoryDto): Promise<CreditCategory> {
    try {
      return this.creditCategoryService.createCreditCategory(body);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can Get All CreditCategory',
    summary: 'Get All CreditCategory',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully Get All CreditCategory.',
    type: CreditCategory,
  })
  @Get()
  async getAllCreditCategory(): Promise<CreditCategory[]> {
    try {
      return this.creditCategoryService.getAllCreditCategory();
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }
}
