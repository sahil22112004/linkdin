import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigration1772446924619 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "firebase_id",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
                    },
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}