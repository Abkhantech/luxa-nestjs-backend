import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CertificationController } from "./certification.controller";
import { Certification } from "./certification.entity";
import { CertificationService } from "./certification.service";

@Module({
  imports: [TypeOrmModule.forFeature([Certification])],
  controllers: [CertificationController],
  providers: [CertificationService],
  exports:[CertificationService]
})
export class CertificationModule {}
