import { Module } from '@nestjs/common';
import { RatingSystemService } from './rating-system.service';
import { RatingSystemController } from './rating-system.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingSystem } from './rating-system.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RatingSystem])],
  controllers: [RatingSystemController],
  providers: [RatingSystemService]
})
export class RatingSystemModule {}
