import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CommentMigration1773318674345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "comments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "post_Id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "user_Id",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "comment_Id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "comment",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    }
                ]
            }),
            true
        );

        await queryRunner.createForeignKey(
            "comments",
            new TableForeignKey({
                columnNames: ["post_Id"],
                referencedTableName: "posts",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE"
            })
        );

        await queryRunner.createForeignKey(
            "comments",
            new TableForeignKey({
                columnNames: ["comment_Id"],
                referencedTableName: "comments",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("comments");
    }

}