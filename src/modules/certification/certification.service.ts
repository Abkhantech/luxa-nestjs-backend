import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import uuid from 'uuid';
import * as crypto from 'crypto';

import { Certification } from './certification.entity';
import { CreateCertificationDto } from './dto/create_certification.dto';

@Injectable()
export class CertificationService {
  constructor(
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,
  ) {}
  async findCertificationById(id: number): Promise<Certification> {
    try {
      return this.certificationRepository.findOne({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async createCertification(
    body: CreateCertificationDto,
  ): Promise<Certification> {
    try {
      return this.certificationRepository
        .save(this.certificationRepository.create(body))
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
  async getCertification(): Promise<Certification[]> {
    try {
      return this.certificationRepository.find();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
