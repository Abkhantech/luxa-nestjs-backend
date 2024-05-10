import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterCredit1709199807055 implements MigrationInterface {
    name = 'AlterCredit1709199807055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit" ADD "ratingSystemId" integer`);
        await queryRunner.query(`ALTER TABLE "project_user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "project_user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "role" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "role" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "super_admin" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "super_admin" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "credit" ADD CONSTRAINT "FK_46b8d13cfedf688cc778dff3490" FOREIGN KEY ("ratingSystemId") REFERENCES "rating_system"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit" DROP CONSTRAINT "FK_46b8d13cfedf688cc778dff3490"`);
        await queryRunner.query(`ALTER TABLE "super_admin" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "super_admin" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "project_user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "project_user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "credit" DROP COLUMN "ratingSystemId"`);
    }

}
