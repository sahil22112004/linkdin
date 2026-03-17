import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class RePostMigration1773639837015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "reposts",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "post_Id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "user_Id",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "rePostedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    }
                ]
            }),
            true
        );
        await queryRunner.createForeignKey(
            "reposts",
            new TableForeignKey({
                columnNames: ["post_Id"],
                referencedTableName: "posts",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("likes");
    }

}