import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskFileTableInDb1713866242298 implements MigrationInterface {
    name = 'AddTaskFileTableInDb1713866242298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "taskFile" ("id" SERIAL NOT NULL, "file" character varying, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "taskId" integer, CONSTRAINT "PK_f83069c06bdbcd6a8d83d697495" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying, "task_count" integer NOT NULL DEFAULT '0', "file" character varying, "description" character varying, "task_credit" character varying, "task_option" character varying, "status" character varying NOT NULL DEFAULT 'Pendding', "dueDate" TIMESTAMP NOT NULL, "canonical_id" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "projectId" integer, "assignedUserId" integer, "createdByUserId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_fd79a32ed0dec031eb7e13764aa"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "UQ_fd79a32ed0dec031eb7e13764aa"`);
        await queryRunner.query(`ALTER TABLE "taskFile" ADD CONSTRAINT "FK_07935c9e21477825c6e019f7584" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_e3bd734666db0cb70e8c8d542c8" FOREIGN KEY ("assignedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_b5dae9857187a41d7d09e07b7e3" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_fd79a32ed0dec031eb7e13764aa" FOREIGN KEY ("certificationId") REFERENCES "certification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_fd79a32ed0dec031eb7e13764aa"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_b5dae9857187a41d7d09e07b7e3"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_e3bd734666db0cb70e8c8d542c8"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`ALTER TABLE "taskFile" DROP CONSTRAINT "FK_07935c9e21477825c6e019f7584"`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "UQ_fd79a32ed0dec031eb7e13764aa" UNIQUE ("certificationId")`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_fd79a32ed0dec031eb7e13764aa" FOREIGN KEY ("certificationId") REFERENCES "certification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "taskFile"`);
    }

}
