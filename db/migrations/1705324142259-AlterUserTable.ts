import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserTable1705324142259 implements MigrationInterface {
    name = 'AlterUserTable1705324142259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "is_on_boarded" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_on_boarded"`);
    }

}
