import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectLocationTable1705319130224
  implements MigrationInterface
{
  name = 'AddProjectLocationTable1705319130224';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "project-location" ("id" SERIAL NOT NULL, "city" character varying, "state" character varying, "address" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "projectId" integer, CONSTRAINT "PK_37eed8d18cdc2302d328f9e320a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "project-location" ADD CONSTRAINT "FK_9a857341c0e044bcdd9a6e9950f" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project-location" DROP CONSTRAINT "FK_9a857341c0e044bcdd9a6e9950f"`,
    );
    await queryRunner.query(`DROP TABLE "project-location"`);
  }
}
