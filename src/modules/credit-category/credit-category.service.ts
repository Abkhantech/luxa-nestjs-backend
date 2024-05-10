import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCreditCategoryDto } from './dto/create-credit-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditCategory } from './credit-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreditCategoryService {
  constructor(
    @InjectRepository(CreditCategory)
    private creditCategoryRepository: Repository<CreditCategory>,
  ) {}
  async createCreditCategory(
    body: CreateCreditCategoryDto,
  ): Promise<CreditCategory> {
    try {
      return this.creditCategoryRepository
        .save(this.creditCategoryRepository.create(body))
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
  async getAllCreditCategory(): Promise<CreditCategory[]> {
    try {
      return this.creditCategoryRepository.find();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
