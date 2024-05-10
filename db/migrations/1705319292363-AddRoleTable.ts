import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleTable1705319292363 implements MigrationInterface {
    name = 'AddRoleTable1705319292363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."role_role_name_enum" AS ENUM('Admin', 'Sub Contractor', 'Sustainability Manager', 'Project Manager')`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "role_name" "public"."role_role_name_enum", "userId" integer, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_3e02d32dd4707c91433de0390ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_3e02d32dd4707c91433de0390ea"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "public"."role_role_name_enum"`);
    }

}
