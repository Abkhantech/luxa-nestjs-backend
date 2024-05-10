import { Module } from '@nestjs/common';
import { ProjectDetailService } from './project-detail.service';
import { ProjectDetailController } from './project-detail.controller';
import { ProjectDetail } from './project-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../project/project.entity';
import { Certification } from '../certification/certification.entity';
import { Task } from '../task/task.entity';
import { Credit } from '../credit/credit.entity';
import { Option } from '../option/option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectDetail,
      Project,
      Certification,
      Task,
      Credit,
      Option,
    ]),
  ],
  controllers: [ProjectDetailController],
  providers: [ProjectDetailService],
})
export class ProjectDetailModule {}
