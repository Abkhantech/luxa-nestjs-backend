import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../task/task.entity';
import { S3Service } from '../utils/s3/s3.service';
import * as crypto from 'crypto';
import {
  Notification_Status,
  ReviewStatus,
  TaskStatus,
} from '../utils/constants';
import { MailerService } from '../utils/mailer/mailer.service';
import { Notification } from '../notification/notification.entity';
import { GatewayService } from '../gateway/gateway.service';
@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private readonly s3Service: S3Service,
    private mailService: MailerService,
    private gatewayService: GatewayService,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}
  async createReview(file: any, body: any) {
    let review;
    try {
      const task = await this.taskRepository.findOne({
        where: { canonical_id: body.task_id },
        relations: ['created_by_user', 'project', 'assigned_user'],
      });
      review = await this.reviewRepository
        .save(
          this.reviewRepository.create({
            task: task,
            ...body,
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
      hash.update(review.id.toString());
      const canonicalID = hash.digest('hex');
      const link = await this.s3Service.uploadFile(
        file['input_file'][0],
        `${canonicalID}Luxa_File`,
      );
      review.file = link.Location;
      review.reviewStatus = ReviewStatus.Pendding;
      await this.reviewRepository.save(review);
      task.status = TaskStatus.Pendding;
      await this.taskRepository.save(task);

      const notification = await this.notificationRepository
        .save(
          this.notificationRepository.create({
            description: `A Review has been submitted for your task submission by ${task.created_by_user?.full_name} on Project - ${task.project?.project_name} for the task - ${task.title}.`,
            sender: task.created_by_user,
            receiver: task.assigned_user,
            type: Notification_Status.Project,
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
      this.gatewayService.sendNotification(notification);
      this.gatewayService.sendTaskAssignment(task);

      this.mailService.sendMail(
        task.assigned_user?.email,
        `<div>
        <p>A Review is created for the following Task. </br>
        Reviewer: ${task.created_by_user?.full_name} on Project  ${task.project?.project_name}<br/>Task Name: ${task.title}<br/>Please go to your LUXA Dashboard in order to view it.</p>
      </div>`,
      );
      return review;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  // findAll() {
  //   return `This action returns all review`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} review`;
  // }

  // update(id: number, updateReviewDto: UpdateReviewDto) {
  //   return `This action updates a #${id} review`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} review`;
  // }
}
