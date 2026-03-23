import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class MessageReadMigration1774245090061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.createTable(
            new Table({
                name: "message_reads",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "messageId",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "userId",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "readAt",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "message_reads",
            new TableForeignKey({
                columnNames: ["messageId"],
                referencedTableName: "messages",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("message_reads");

        const foreignKey = table?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("messageId") !== -1
        );

        if (foreignKey) {
            await queryRunner.dropForeignKey("message_reads", foreignKey);
        }

        await queryRunner.dropTable("message_reads");
    }
}