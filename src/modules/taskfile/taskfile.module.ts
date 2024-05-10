import { Module } from '@nestjs/common';
import { TaskfileService } from './taskfile.service';
import { TaskfileController } from './taskfile.controller';
import { Taskfile } from './taskfile.entity';
import { Task } from '../task/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from '../utils/s3/s3.service';
import { Review } from '../review/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Taskfile,Review])],
  controllers: [TaskfileController],
  providers: [TaskfileService, S3Service],
  exports: [TaskfileService, S3Service],
})
export class TaskfileModule {}
