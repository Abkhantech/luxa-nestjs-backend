import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterProjectTable1705566358529 implements MigrationInterface {
    name = 'AlterProjectTable1705566358529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "project_type" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "project_size" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "budget" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "no_of_floors" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "substantial_complete_date" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "substantial_complete_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "no_of_floors" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "budget" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "project_size" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "project_type" SET NOT NULL`);
    }

}
