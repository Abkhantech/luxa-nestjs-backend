import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterCreditTable1709554567722 implements MigrationInterface {
    name = 'AlterCreditTable1709554567722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit" ADD "ratingSystemId" integer`);
        await queryRunner.query(`ALTER TABLE "credit" ADD CONSTRAINT "FK_46b8d13cfedf688cc778dff3490" FOREIGN KEY ("ratingSystemId") REFERENCES "rating_system"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credit" DROP CONSTRAINT "FK_46b8d13cfedf688cc778dff3490"`);
        await queryRunner.query(`ALTER TABLE "credit" DROP COLUMN "ratingSystemId"`);
    }

}
