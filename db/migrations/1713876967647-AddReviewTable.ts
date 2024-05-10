import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReviewTable1713876967647 implements MigrationInterface {
    name = 'AddReviewTable1713876967647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Review" ("id" SERIAL NOT NULL, "title" character varying, "file" character varying, "description" character varying, "dueDate" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "taskId" integer, CONSTRAINT "PK_4af5ddfa8a65e5571d851e4b752" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Review" ADD CONSTRAINT "FK_ba9152c84e8bde371c6a6d9a37c" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Review" DROP CONSTRAINT "FK_ba9152c84e8bde371c6a6d9a37c"`);
        await queryRunner.query(`DROP TABLE "Review"`);
    }

}
