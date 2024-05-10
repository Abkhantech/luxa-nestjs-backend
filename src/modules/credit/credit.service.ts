import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCreditDto } from './dto/create-credit.dto';
import { Credit } from './credit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectCreditDto } from './dto/project.credit.dto';
import { Project } from '../project/project.entity';
import { promises } from 'dns';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(Credit)
    private creditRepository: Repository<Credit>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  async createCredit(body: CreateCreditDto): Promise<Credit> {
    try {
      return this.creditRepository
        .save(this.creditRepository.create(body))
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
  async getALLCredits(): Promise<Credit[]> {
    try {
      return this.creditRepository.find({
        relations: ['creditCategory', 'options'],
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findCreditById(id: number): Promise<Credit> {
    try {
      return this.creditRepository.findOne({
        where: { id: id },
        relations: ['options'],
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async findOne(id: number): Promise<Credit> {
    try {
      return this.creditRepository.findOne({
        where: { id: id },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }


}
