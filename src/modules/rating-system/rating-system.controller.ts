import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { RatingSystemService } from './rating-system.service';
import { CreateRatingSystemDto } from './dto/create-rating-system.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RatingSystem } from './rating-system.entity';

@ApiTags('Rating System')
@Controller('rating-system')
export class RatingSystemController {
  constructor(private readonly ratingSystemService: RatingSystemService) {}

  @ApiOperation({
    description: 'A successful hit can create RatingSystem',
    summary: 'Create RatingSystem',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created RatingSystem.',
    type: RatingSystem,
  })
  @Post()
  async create(@Body() body: CreateRatingSystemDto): Promise<RatingSystem> {
    try {
      return this.ratingSystemService.createRatingSystem(body);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can Get All RatingSystems',
    summary: 'Get All RatingSystems',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully Get All RatingSystems.',
    type: RatingSystem,
  })
  @Get()
  async getAllRatingSystems(): Promise<RatingSystem[]> {
    try {
      return this.ratingSystemService.getAllRatingSystems();
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  @ApiOperation({
    description: 'A successful hit can Get a RatingSystem',
    summary: 'Get a RatingSystems',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully Get a RatingSystems.',
    type: RatingSystem,
  })
  @Get(':id')
  async getRatingSystem(@Param('id') id: number): Promise<RatingSystem> {
    try {
      return this.ratingSystemService.getRatingSystem(id);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }
}
