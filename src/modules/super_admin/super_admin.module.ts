import { Module } from '@nestjs/common';
import { SuperAdminService } from './super_admin.service';
import { SuperAdminController } from './super_admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperAdmin } from './super_admin.entity';
import { AuthModule } from '../utils/auth/auth.module';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity';
import { Company } from '../company/company.entity';
import { Role } from '../role/role.entity';
import { MailerModule } from '../utils/mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SuperAdmin,User,Company,Role]),
    AuthModule,
    UserModule,
    MailerModule
  ],
  controllers: [SuperAdminController],
  providers: [SuperAdminService],
})
export class SuperAdminModule {}
