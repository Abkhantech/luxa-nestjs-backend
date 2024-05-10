import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterProjectTableAddBridgeTableWithCertification1706516599360 implements MigrationInterface {
    name = 'AlterProjectTableAddBridgeTableWithCertification1706516599360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_certifications_certification" ("projectId" integer NOT NULL, "certificationId" integer NOT NULL, CONSTRAINT "PK_8e99f43282c18321e6a931fd76e" PRIMARY KEY ("projectId", "certificationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dd713e5d5dfed93736aeed2ae5" ON "project_certifications_certification" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ad674c16bdfc4e9766db748a67" ON "project_certifications_certification" ("certificationId") `);
        await queryRunner.query(`ALTER TABLE "project_certifications_certification" ADD CONSTRAINT "FK_dd713e5d5dfed93736aeed2ae52" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_certifications_certification" ADD CONSTRAINT "FK_ad674c16bdfc4e9766db748a675" FOREIGN KEY ("certificationId") REFERENCES "certification"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_certifications_certification" DROP CONSTRAINT "FK_ad674c16bdfc4e9766db748a675"`);
        await queryRunner.query(`ALTER TABLE "project_certifications_certification" DROP CONSTRAINT "FK_dd713e5d5dfed93736aeed2ae52"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ad674c16bdfc4e9766db748a67"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd713e5d5dfed93736aeed2ae5"`);
        await queryRunner.query(`DROP TABLE "project_certifications_certification"`);
    }

}
