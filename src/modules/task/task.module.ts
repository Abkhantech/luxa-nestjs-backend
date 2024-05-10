import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Project } from '../project/project.entity';
import { userInfo } from 'os';
import { User } from '../user/user.entity';
import { ProjectUser } from '../project-user/project-user.entity';
import { S3Service } from '../utils/s3/s3.service';
import { Taskfile } from '../taskfile/taskfile.entity';
import { MailerModule } from '../utils/mailer/mailer.module';
import { Notification } from '../notification/notification.entity';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task,Project,User,ProjectUser,Taskfile,Notification]),MailerModule,GatewayModule],
  controllers: [TaskController],
  providers: [TaskService,S3Service],
  exports:[TaskService,S3Service]
})
export class TaskModule {}
