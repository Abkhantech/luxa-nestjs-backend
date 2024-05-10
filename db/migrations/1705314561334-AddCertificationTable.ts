import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCertificationTable1705314561334 implements MigrationInterface {
    name = 'AddCertificationTable1705314561334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "certification" ("id" SERIAL NOT NULL, "type" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_a7364bd3e4a407f67d8165b820c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(`DROP TABLE "certification"`);
     
    }

}
