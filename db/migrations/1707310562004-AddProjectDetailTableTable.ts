import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectDetailTableTable1707310562004 implements MigrationInterface {
    name = 'AddProjectDetailTableTable1707310562004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_detail" ("id" SERIAL NOT NULL, "credit_points" integer, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "projectId" integer, "certificationId" integer, "ratingSystemId" integer, CONSTRAINT "REL_d167d852f86204f0346254d908" UNIQUE ("projectId"), CONSTRAINT "REL_c1b72afca728e3c525b666f806" UNIQUE ("certificationId"), CONSTRAINT "REL_3bebcef3bf144a340bd43866a7" UNIQUE ("ratingSystemId"), CONSTRAINT "PK_fcd9f4f04c652db3bcb3b412d17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_credits_credit" ("projectId" integer NOT NULL, "creditId" integer NOT NULL, CONSTRAINT "PK_ce202a750001062acc0b0d82d75" PRIMARY KEY ("projectId", "creditId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_96fea77ccc7ad510fb78da9a8a" ON "project_credits_credit" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6ea4130812321ec4242ced5f0f" ON "project_credits_credit" ("creditId") `);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD CONSTRAINT "FK_d167d852f86204f0346254d9080" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD CONSTRAINT "FK_c1b72afca728e3c525b666f806f" FOREIGN KEY ("certificationId") REFERENCES "certification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_detail" ADD CONSTRAINT "FK_3bebcef3bf144a340bd43866a73" FOREIGN KEY ("ratingSystemId") REFERENCES "rating_system"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_credits_credit" ADD CONSTRAINT "FK_96fea77ccc7ad510fb78da9a8a0" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_credits_credit" ADD CONSTRAINT "FK_6ea4130812321ec4242ced5f0f7" FOREIGN KEY ("creditId") REFERENCES "credit"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_credits_credit" DROP CONSTRAINT "FK_6ea4130812321ec4242ced5f0f7"`);
        await queryRunner.query(`ALTER TABLE "project_credits_credit" DROP CONSTRAINT "FK_96fea77ccc7ad510fb78da9a8a0"`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP CONSTRAINT "FK_3bebcef3bf144a340bd43866a73"`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP CONSTRAINT "FK_c1b72afca728e3c525b666f806f"`);
        await queryRunner.query(`ALTER TABLE "project_detail" DROP CONSTRAINT "FK_d167d852f86204f0346254d9080"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ea4130812321ec4242ced5f0f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_96fea77ccc7ad510fb78da9a8a"`);
        await queryRunner.query(`DROP TABLE "project_credits_credit"`);
        await queryRunner.query(`DROP TABLE "project_detail"`);
    }

}
