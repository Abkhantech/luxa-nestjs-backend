import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompanyTable1705314410069 implements MigrationInterface {
    name = 'AddCompanyTable1705314410069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "industry_type" character varying NOT NULL, "address" character varying, "business_phone_number" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_b4a2116101fc26a095450a22c01" UNIQUE ("business_phone_number"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
 
        await queryRunner.query(`DROP TABLE "company"`);
       
    }

}
