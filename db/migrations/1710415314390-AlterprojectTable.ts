import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterprojectTable1710415314390 implements MigrationInterface {
    name = 'AlterprojectTable1710415314390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "total_points" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "total_points"`);
    }

}
