import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterProjectTableByAddingRatingSystemRelation1710928428708 implements MigrationInterface {
    name = 'AlterProjectTableByAddingRatingSystemRelation1710928428708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_rating_system_rating_system" ("projectId" integer NOT NULL, "ratingSystemId" integer NOT NULL, CONSTRAINT "PK_a0ddba327a17cee8171ed8614b8" PRIMARY KEY ("projectId", "ratingSystemId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ef45af41f8091684012c9f93ac" ON "project_rating_system_rating_system" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b74093f6cc7e316c9680a83c84" ON "project_rating_system_rating_system" ("ratingSystemId") `);
        await queryRunner.query(`ALTER TABLE "project_rating_system_rating_system" ADD CONSTRAINT "FK_ef45af41f8091684012c9f93ac9" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_rating_system_rating_system" ADD CONSTRAINT "FK_b74093f6cc7e316c9680a83c84c" FOREIGN KEY ("ratingSystemId") REFERENCES "rating_system"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_rating_system_rating_system" DROP CONSTRAINT "FK_b74093f6cc7e316c9680a83c84c"`);
        await queryRunner.query(`ALTER TABLE "project_rating_system_rating_system" DROP CONSTRAINT "FK_ef45af41f8091684012c9f93ac9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b74093f6cc7e316c9680a83c84"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef45af41f8091684012c9f93ac"`);
        await queryRunner.query(`DROP TABLE "project_rating_system_rating_system"`);
    }

}
