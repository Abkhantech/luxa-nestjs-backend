import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}
  async getAllOption(): Promise<Option[]> {
    try {
      return this.optionRepository.find({relations:['credit']});
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
