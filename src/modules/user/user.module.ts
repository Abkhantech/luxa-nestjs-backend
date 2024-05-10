import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../utils/auth/auth.module';
import { MailerModule } from '../utils/mailer/mailer.module';
import { Role } from '../role/role.entity';
import { ProjectUser } from '../project-user/project-user.entity';
import { Project } from '../project/project.entity';
import { Task } from '../task/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, ProjectUser, Project, Task]),
    AuthModule,
    MailerModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
