import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class MessageMigration1774245075972 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.createTable(
            new Table({
                name: "messages",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "conversationId",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "senderId",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "content",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "type",
                        type: "enum",
                        enum: ["TEXT", "IMAGE", "VIDEO"],
                        default: `'TEXT'`,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "deletedAt",
                        type: "timestamp",
                        isNullable: true,
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "messages",
            new TableForeignKey({
                columnNames: ["conversationId"],
                referencedTableName: "conversations",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("messages");

        const foreignKey = table?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("conversationId") !== -1
        );

        if (foreignKey) {
            await queryRunner.dropForeignKey("messages", foreignKey);
        }

        await queryRunner.dropTable("messages");
    }
}