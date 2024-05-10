import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Task } from '../task/task.entity';
import { S3Service } from '../utils/s3/s3.service';
import { MailerModule } from '../utils/mailer/mailer.module';
import { Notification } from '../notification/notification.entity';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Task, Notification]),
    MailerModule,
    GatewayModule
  ],
  controllers: [ReviewController],
  providers: [ReviewService, S3Service],
  exports: [S3Service],
})
export class ReviewModule {}
