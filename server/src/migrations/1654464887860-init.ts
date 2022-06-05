import { MigrationInterface, QueryRunner } from "typeorm";

export class init1654464887860 implements MigrationInterface {
    name = 'init1654464887860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "education" ("_id" SERIAL NOT NULL, "date" character varying NOT NULL, "school" character varying NOT NULL, "description" character varying NOT NULL, "resume_id" integer, CONSTRAINT "PK_d84ff1ce262d2997863c7f90a89" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "experience" ("_id" SERIAL NOT NULL, "date" character varying NOT NULL, "company" character varying NOT NULL, "description" character varying NOT NULL, "resume_id" integer, CONSTRAINT "PK_1ca4a10562db95238d008f01a6e" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "resume" ("_id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "skills" text array NOT NULL, "creatorId" integer NOT NULL, CONSTRAINT "PK_71d723d9a3a0fd25d9cd2154e26" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("_id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" text NOT NULL, "resumeId" integer NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_457bfa3e35350a716846b03102d" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_8e69b048703e0a5cdc4d8807b7a" FOREIGN KEY ("resume_id") REFERENCES "resume"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_6b65e2a85c9838ca97137e4ef5b" FOREIGN KEY ("resume_id") REFERENCES "resume"("_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_6b65e2a85c9838ca97137e4ef5b"`);
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_8e69b048703e0a5cdc4d8807b7a"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "resume"`);
        await queryRunner.query(`DROP TABLE "experience"`);
        await queryRunner.query(`DROP TABLE "education"`);
    }

}
