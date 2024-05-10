import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRemainingTable1707303298009 implements MigrationInterface {
    name = 'AddRemainingTable1707303298009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certification" RENAME COLUMN "type" TO "certificationType"`);
        await queryRunner.query(`CREATE TABLE "option" ("id" SERIAL NOT NULL, "option" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "creditId" integer, CONSTRAINT "PK_e6090c1c6ad8962eea97abdbe63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "credit" ("id" SERIAL NOT NULL, "creditType" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "creditCategoryId" integer, CONSTRAINT "PK_c98add8e192ded18b69c3e345a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "credit_category" ("id" SERIAL NOT NULL, "credit_category" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_827d16d28438fb4e763193ad03d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating_system" ("id" SERIAL NOT NULL, "rating_system" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_4dd6d555c877a488611e6c7426a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating_system_credit_categories_credit_category" ("ratingSystemId" integer NOT NULL, "creditCategoryId" integer NOT NULL, CONSTRAINT "PK_2088b4d14743b6a4bfa8f301e00" PRIMARY KEY ("ratingSystemId", "creditCategoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fb3047aed98297f9addf5b70c7" ON "rating_system_credit_categories_credit_category" ("ratingSystemId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5b9f8268746e65632506679259" ON "rating_system_credit_categories_credit_category" ("creditCategoryId") `);
        await queryRunner.query(`CREATE TABLE "certification_rating_systems_rating_system" ("certificationId" integer NOT NULL, "ratingSystemId" integer NOT NULL, CONSTRAINT "PK_eff78b0e37f8f466c792b6c1045" PRIMARY KEY ("certificationId", "ratingSystemId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_880f39e46655a6086ad03ec20b" ON "certification_rating_systems_rating_system" ("certificationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb768173f2d9ae4ed776545a00" ON "certification_rating_systems_rating_system" ("ratingSystemId") `);
        await queryRunner.query(`ALTER TABLE "option" ADD CONSTRAINT "FK_a0c8b018305bd87a4aba8ea3dfd" FOREIGN KEY ("creditId") REFERENCES "credit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "credit" ADD CONSTRAINT "FK_a706c8e3ab0946e1d1c50d3fe54" FOREIGN KEY ("creditCategoryId") REFERENCES "credit_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating_system_credit_categories_credit_category" ADD CONSTRAINT "FK_fb3047aed98297f9addf5b70c7c" FOREIGN KEY ("ratingSystemId") REFERENCES "rating_system"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rating_system_credit_categories_credit_category" ADD CONSTRAINT "FK_5b9f8268746e656325066792595" FOREIGN KEY ("creditCategoryId") REFERENCES "credit_category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "certification_rating_systems_rating_system" ADD CONSTRAINT "FK_880f39e46655a6086ad03ec20b4" FOREIGN KEY ("certificationId") REFERENCES "certification"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "certification_rating_systems_rating_system" ADD CONSTRAINT "FK_fb768173f2d9ae4ed776545a009" FOREIGN KEY ("ratingSystemId") REFERENCES "rating_system"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certification_rating_systems_rating_system" DROP CONSTRAINT "FK_fb768173f2d9ae4ed776545a009"`);
        await queryRunner.query(`ALTER TABLE "certification_rating_systems_rating_system" DROP CONSTRAINT "FK_880f39e46655a6086ad03ec20b4"`);
        await queryRunner.query(`ALTER TABLE "rating_system_credit_categories_credit_category" DROP CONSTRAINT "FK_5b9f8268746e656325066792595"`);
        await queryRunner.query(`ALTER TABLE "rating_system_credit_categories_credit_category" DROP CONSTRAINT "FK_fb3047aed98297f9addf5b70c7c"`);
        await queryRunner.query(`ALTER TABLE "credit" DROP CONSTRAINT "FK_a706c8e3ab0946e1d1c50d3fe54"`);
        await queryRunner.query(`ALTER TABLE "option" DROP CONSTRAINT "FK_a0c8b018305bd87a4aba8ea3dfd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb768173f2d9ae4ed776545a00"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_880f39e46655a6086ad03ec20b"`);
        await queryRunner.query(`DROP TABLE "certification_rating_systems_rating_system"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5b9f8268746e65632506679259"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb3047aed98297f9addf5b70c7"`);
        await queryRunner.query(`DROP TABLE "rating_system_credit_categories_credit_category"`);
        await queryRunner.query(`DROP TABLE "rating_system"`);
        await queryRunner.query(`DROP TABLE "credit_category"`);
        await queryRunner.query(`DROP TABLE "credit"`);
        await queryRunner.query(`DROP TABLE "option"`);
        await queryRunner.query(`ALTER TABLE "certification" RENAME COLUMN "certificationType" TO "type"`);
    }

}
