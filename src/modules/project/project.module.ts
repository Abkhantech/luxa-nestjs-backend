import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { AuthModule } from '../utils/auth/auth.module';
import { UserModule } from '../user/user.module';
import { ProjectUser } from '../project-user/project-user.entity';
import { ProjectLocation } from '../project-location/project-location.entity';
import { RatingSystem } from '../rating-system/rating-system.entity';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';
import { MailerModule } from '../utils/mailer/mailer.module';
import { Notification } from '../notification/notification.entity';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectUser, ProjectLocation,RatingSystem,Task,User,Notification]),
    AuthModule,
    UserModule,
    MailerModule,
    GatewayModule
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports:[ProjectService]
})
export class ProjectModule {}
