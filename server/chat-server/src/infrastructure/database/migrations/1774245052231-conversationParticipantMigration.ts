import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ConversationParticipantMigration1774245052231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
            new Table({
                name: "conversation_participants",
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
                        name: "userId",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "joinedAt",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "conversation_participants",
            new TableForeignKey({
                columnNames: ["conversationId"],
                referencedTableName: "conversations",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("conversation_participants");

        const foreignKey = table?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("conversationId") !== -1
        );

        if (foreignKey) {
            await queryRunner.dropForeignKey("conversation_participants", foreignKey);
        }

        await queryRunner.dropTable("conversation_participants");
    }
}
