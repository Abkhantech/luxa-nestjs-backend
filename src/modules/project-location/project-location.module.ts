import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectLocationController } from './project-location.controller';
import { ProjectLocation } from './project-location.entity';
import { ProjectLocationService } from './project-location.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
    ProjectLocation
    ]),
  ],
  controllers: [ProjectLocationController],
  providers: [ProjectLocationService]
})
export class ProjectLocationModule {}
