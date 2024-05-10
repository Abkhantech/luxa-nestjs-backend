import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterReviewTable1714041131540 implements MigrationInterface {
    name = 'AlterReviewTable1714041131540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Review" ADD "reviewStatus" character varying NOT NULL DEFAULT 'Closed'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Review" DROP COLUMN "reviewStatus"`);
    }

}
