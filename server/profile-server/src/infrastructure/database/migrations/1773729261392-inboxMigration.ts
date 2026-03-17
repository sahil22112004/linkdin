import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InboxMigration1773729261392 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_inbox",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "eventId",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: "handler",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "receivedAt",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("user_inbox");
    }
}