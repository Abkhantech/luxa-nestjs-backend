import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './modules/company/company.module';
import { ProjectModule } from './modules/project/project.module';
import { ProjectLocationModule } from './modules/project-location/project-location.module';
import { AuthModule } from './modules/utils/auth/auth.module';
import { MailerModule } from './modules/utils/mailer/mailer.module';
import { UserModule } from './modules/user/user.module';
import { ProjectUserModule } from './modules/project-user/project-user.module';
import { RoleModule } from './modules/role/role.module';
import { SuperAdminModule } from './modules/super_admin/super_admin.module';
import { CertificationModule } from './modules/certification/certification.module';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Logger } from './modules/utils/logger/logger';
import { RatingSystemModule } from './modules/rating-system/rating-system.module';
import { CreditCategoryModule } from './modules/credit-category/credit-category.module';
import { CreditModule } from './modules/credit/credit.module';
import { OptionModule } from './modules/option/option.module';
import { ProjectDetailModule } from './modules/project-detail/project-detail.module';
import { TaskModule } from './modules/task/task.module';
import { TaskfileModule } from './modules/taskfile/taskfile.module';
import { ReviewModule } from './modules/review/review.module';
import { NotificationModule } from './modules/notification/notification.module';
import { GatewayModule } from './modules/gateway/gateway.module';

@Module({  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    CompanyModule,
    ProjectModule,
    ProjectLocationModule,
    AuthModule,
    MailerModule,
    UserModule,
    ProjectUserModule,
    RoleModule,
    SuperAdminModule,
    CertificationModule,
    RoleModule,
    SuperAdminModule,
    RatingSystemModule,
    CreditCategoryModule,
    CreditModule,
    OptionModule,
    ProjectDetailModule,
    TaskModule,
    TaskfileModule,
    ReviewModule,
    NotificationModule,
    GatewayModule
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: Logger }],
})
export class AppModule {}
