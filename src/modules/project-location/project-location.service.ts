import {
    Injectable,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import uuid from 'uuid';
  import * as crypto from 'crypto';

import { ProjectLocation } from './project-location.entity';
  
  
  @Injectable()
  export class ProjectLocationService {
    constructor(
      @InjectRepository(ProjectLocation) private projectLocationRepository: Repository<ProjectLocation>,
    ) {}

  
  }
  