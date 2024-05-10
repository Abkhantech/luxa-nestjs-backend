import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateRatingSystemDto } from './dto/create-rating-system.dto';
import { RatingSystem } from './rating-system.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RatingSystemService {
  constructor(
    @InjectRepository(RatingSystem)
    private ratingSystemRepository: Repository<RatingSystem>,
  ) {}

  async createRatingSystem(body: CreateRatingSystemDto): Promise<RatingSystem> {
    try {
      return this.ratingSystemRepository
        .save(this.ratingSystemRepository.create(body))
        .catch((err: any) => {
          throw new HttpException(
            {
              message: `${err}`,
            },
            HttpStatus.CONFLICT,
          );
        });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async getAllRatingSystems(): Promise<RatingSystem[]> {
    try {
      return this.ratingSystemRepository.find();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async getRatingSystem(id: number): Promise<RatingSystem> {
    try {
      return this.ratingSystemRepository.findOne({ where: { id: id } ,relations:['credits','credits.creditCategory']});
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
