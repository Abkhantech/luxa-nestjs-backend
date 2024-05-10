import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterProjectDetailTable1709553889499 implements MigrationInterface {
    name = 'AlterProjectDetailTable1709553889499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_detail" DROP CONSTRAINT "FK_c1b72afca728e3c525b666f806f"`);
        await queryRunner.query(`ALTER TABLE "credit" DROP CONSTRAINT "FK_46b8d13cfedf688cc778dff3490"`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP CONSTRAINT "REL_c1b72afca728e3c525b666f806"`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP COLUMN "certificationId"`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP COLUMN "credit_points"`);
        await queryRunner.query(`ALTER TABLE "credit" DROP COLUMN "ratingSystemId"`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD "points" integer`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD "creditId" integer`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD "optionId" integer`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP CONSTRAINT "FK_d167d852f86204f0346254d9080"`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP CONSTRAINT "FK_3bebcef3bf144a340bd43866a73"`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP CONSTRAINT "REL_d167d852f86204f0346254d908"`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP CONSTRAINT "REL_3bebcef3bf144a340bd43866a7"`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD CONSTRAINT "FK_d167d852f86204f0346254d9080" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD CONSTRAINT "FK_3bebcef3bf144a340bd43866a73" FOREIGN KEY ("ratingSystemId") REFERENCES "rating_system"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD CONSTRAINT "FK_bd302186a389751310c38c8a606" FOREIGN KEY ("creditId") REFERENCES "credit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD CONSTRAINT "FK_f69ea3f5c8f80333b4ca916b4b7" FOREIGN KEY ("optionId") REFERENCES "option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_detail" DROP CONSTRAINT "FK_f69ea3f5c8f80333b4ca916b4b7"`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP CONSTRAINT "FK_bd302186a389751310c38c8a606"`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP CONSTRAINT "FK_3bebcef3bf144a340bd43866a73"`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP CONSTRAINT "FK_d167d852f86204f0346254d9080"`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD CONSTRAINT "REL_3bebcef3bf144a340bd43866a7" UNIQUE ("ratingSystemId")`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD CONSTRAINT "REL_d167d852f86204f0346254d908" UNIQUE ("projectId")`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD CONSTRAINT "FK_3bebcef3bf144a340bd43866a73" FOREIGN KEY ("ratingSystemId") REFERENCES "rating_system"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD CONSTRAINT "FK_d167d852f86204f0346254d9080" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP COLUMN "optionId"`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP COLUMN "creditId"`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP COLUMN "points"`);
        await queryRunner.query(`ALTER TABLE "credit" ADD "ratingSystemId" integer`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD "credit_points" integer`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD "certificationId" integer`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD CONSTRAINT "REL_c1b72afca728e3c525b666f806" UNIQUE ("certificationId")`);
        await queryRunner.query(`ALTER TABLE "credit" ADD CONSTRAINT "FK_46b8d13cfedf688cc778dff3490" FOREIGN KEY ("ratingSystemId") REFERENCES "rating_system"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD CONSTRAINT "FK_c1b72afca728e3c525b666f806f" FOREIGN KEY ("certificationId") REFERENCES "certification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
