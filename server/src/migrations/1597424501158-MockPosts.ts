import { MigrationInterface, QueryRunner } from "typeorm";

export class MockPosts1597424501158 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
  }

  public async down(_: QueryRunner): Promise<void> {}
}
