import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterprojectByAddingCertification1710481994617 implements MigrationInterface {
    name = 'AlterprojectByAddingCertification1710481994617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "certificationId" integer`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "UQ_fd79a32ed0dec031eb7e13764aa" UNIQUE ("certificationId")`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_fd79a32ed0dec031eb7e13764aa" FOREIGN KEY ("certificationId") REFERENCES "certification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_fd79a32ed0dec031eb7e13764aa"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "UQ_fd79a32ed0dec031eb7e13764aa"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "certificationId"`);
    }

}
