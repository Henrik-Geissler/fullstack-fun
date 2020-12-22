/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1597626060119 implements MigrationInterface {
  name = 'Initial1597626060119'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "toast" 
DROP COLUMN "lastname" IF EXISTS;ALTER TABLE "toast" 
DROP COLUMN "firstname" IF EXISTS;ALTER TABLE "toast" 
ADD COLUMN "name" character varying;UPDATE "toast"
SET "name" = "John Doe"; ALTER TABLE "toast"
ALTER COLUMN "name" SET NULL;
`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "toast"`)
  }
}
