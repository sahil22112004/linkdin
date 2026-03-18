import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class FollowMigration1773811933729 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
            new Table({
                name: "follows",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "followByUser",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "followToUser",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: "followedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    }
                ]
            }),
            true
        );
        await queryRunner.createForeignKey(
            "follows",
            new TableForeignKey({
                columnNames: ["followByUser"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL"
            })
        );

        await queryRunner.createForeignKey(
            "follows",
            new TableForeignKey({
                columnNames: ["followToUser"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("follows");
    }

}