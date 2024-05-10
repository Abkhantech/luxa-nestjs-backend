import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectCertificationTable1705315073432 implements MigrationInterface {
    name = 'AddProjectCertificationTable1705315073432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project-certification" ("id" SERIAL NOT NULL, "rating" character varying, "rating_system" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "certificationId" integer, "projectId" integer, CONSTRAINT "PK_47b42a22f679dcf3c2a9cd6f8c0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project-certification" ADD CONSTRAINT "FK_9b98d36a7c3e0061d720e7671b8" FOREIGN KEY ("certificationId") REFERENCES "certification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project-certification" ADD CONSTRAINT "FK_ad9e4e4cd305965a5cfe2d478bd" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project-certification" DROP CONSTRAINT "FK_ad9e4e4cd305965a5cfe2d478bd"`);
        await queryRunner.query(`ALTER TABLE "project-certification" DROP CONSTRAINT "FK_9b98d36a7c3e0061d720e7671b8"`);
        await queryRunner.query(`DROP TABLE "project-certification"`);

    }

}
