import { Module } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';
import { Credit } from './credit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../project/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credit,Project])],
  controllers: [CreditController],
  providers: [CreditService],
})
export class CreditModule {}
