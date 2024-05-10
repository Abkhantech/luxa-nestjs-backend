import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectUser } from "./project-user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectUser])],
  controllers:[],
  providers: [],
})
export class ProjectUserModule {}
