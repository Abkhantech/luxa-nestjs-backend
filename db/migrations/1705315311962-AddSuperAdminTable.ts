import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSuperAdminTable1705315311962 implements MigrationInterface {
  name = 'AddSuperAdminTable1705315311962';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "super_admin" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "full_name" character varying, "mobile_number" character varying, "password" character varying, "canonical_id" character varying, CONSTRAINT "UQ_1ce171ef935f892c7f13004f232" UNIQUE ("email"), CONSTRAINT "UQ_0fc9c182820626db7ffae81c5d1" UNIQUE ("mobile_number"), CONSTRAINT "PK_3c4fab866f4c62a54ee1ebb1fe3" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "super_admin"`);
  }
}
