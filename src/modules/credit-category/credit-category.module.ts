import { Module } from '@nestjs/common';
import { CreditCategoryService } from './credit-category.service';
import { CreditCategoryController } from './credit-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCategory } from './credit-category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CreditCategory])],
  controllers: [CreditCategoryController],
  providers: [CreditCategoryService]
})
export class CreditCategoryModule {}
