import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectUserTable1705314950308 implements MigrationInterface {
  name = 'AddProjectUserTable1705314950308';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "project_user" ("id" SERIAL NOT NULL, "user_id" integer, "project_id" integer, CONSTRAINT "PK_1cf56b10b23971cfd07e4fc6126" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_user" ADD CONSTRAINT "FK_e376a33a7ef5ae8911a43a53de7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_user" ADD CONSTRAINT "FK_2a781b3f2de389d1c6ea41f48f5" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_user" DROP CONSTRAINT "FK_2a781b3f2de389d1c6ea41f48f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_user" DROP CONSTRAINT "FK_e376a33a7ef5ae8911a43a53de7"`,
    );
    await queryRunner.query(`DROP TABLE "project_user"`);
  }
}
