import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectTable1705314637031 implements MigrationInterface {
    name = 'AddProjectTable1705314637031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "project_name" character varying NOT NULL, "project_type" character varying NOT NULL, "project_size" integer NOT NULL, "budget" integer NOT NULL, "no_of_floors" integer NOT NULL, "project_start_date" TIMESTAMP NOT NULL, "estimated_end_date" TIMESTAMP NOT NULL, "substantial_complete_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "companyId" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_17c18aa92afa5fa328e9e181fe8" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_17c18aa92afa5fa328e9e181fe8"`);
        await queryRunner.query(`DROP TABLE "project"`);
       
    }

}
