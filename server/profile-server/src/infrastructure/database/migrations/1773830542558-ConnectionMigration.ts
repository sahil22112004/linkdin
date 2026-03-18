import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ConnectionMigration1773830542558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
            new Table({
                name: "connections",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "senderId",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "receiverId",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "status",
                        type: 'enum',
                        enum: ['PENDING', 'ACCEPTED','REJECTED'],
                        default: "'PENDING'",
                    },
                    {
                        name: "deletedAt",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    }
                ]
            }),
            true
        );

        await queryRunner.createForeignKey(
            "connections",
            new TableForeignKey({
                columnNames: ["senderId"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL"
            })
        );

        await queryRunner.createForeignKey(
            "connections",
            new TableForeignKey({
                columnNames: ["receiverId"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("connections");
    }
}