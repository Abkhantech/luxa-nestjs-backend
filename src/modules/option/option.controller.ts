import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { OptionService } from './option.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Option } from './option.entity';

@ApiTags('Option')
@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}
  @ApiOperation({
    description: 'A successful hit can Get All Options',
    summary: 'Get All Options',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully Get All Options.',
    type: Option,
  })
  @Get()
  async getAllRatingSystems(): Promise<Option[]> {
    try {
      return this.optionService.getAllOption();
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }
  
}
