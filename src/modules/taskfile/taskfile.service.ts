import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { S3Service } from '../utils/s3/s3.service';
import { Taskfile } from './taskfile.entity';
import { Repository } from 'typeorm';
import { Task } from '../task/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Review } from '../review/review.entity';
import { ReviewStatus } from '../utils/constants';

@Injectable()
export class TaskfileService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(Taskfile)
    private taskFileRepository: Repository<Taskfile>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>,

    private readonly s3Service: S3Service,
  ) {}
  async createTaskFile(file: any, body: any) {
    try {
      const task = await this.taskRepository.findOne({
        where: { id: body.task_id },
        relations: ['reviews'],
      });
      const hasPendingStatus = task.reviews?.filter(
        (item: { reviewStatus: string }) => item?.reviewStatus === 'Pendding',
      );
      if (hasPendingStatus.length !== 0) {
        const review = await this.reviewRepository.findOne({
          where: { id: hasPendingStatus[0].id },
        });
        review.reviewStatus = ReviewStatus.Closed;
        await this.reviewRepository.save(review);
      }
      const taskfile = await this.taskFileRepository
        .save(
          this.taskFileRepository.create({
            task: task,
            description: body.description,
          }),
        )
        .catch((err: any) => {
          console.log(err);
          throw new HttpException(
            {
              message: `${err}`,
            },
            HttpStatus.CONFLICT,
          );
        });

      const hash = crypto.createHash('sha256');
      hash.update(taskfile.id.toString());
      const canonicalID = hash.digest('hex');
      const link = await this.s3Service.uploadFile(
        file['input_file'][0],
        `${canonicalID}Luxa_File`,
      );
      taskfile.file = link.Location;
      await this.taskFileRepository.save(taskfile);
      return taskfile;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }
}
