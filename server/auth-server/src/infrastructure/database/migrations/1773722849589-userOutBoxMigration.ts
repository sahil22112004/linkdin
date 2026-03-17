import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserOutBoxMigration1773722849589 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_outbox",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "Payload",
                        type: "jsonb",
                        isNullable: false,
                    },
                    {
                        name: "status",
                        type: 'enum',
                        enum: ['PENDING', 'PUBLISHED'],
                        default: "'PENDING'",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_outbox");
    }
}