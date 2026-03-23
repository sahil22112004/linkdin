import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class EducationMigration1774258067358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
            new Table({
                name: "education",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "userid",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "school",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "degree",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "fieldOfStudy",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "startTime",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "endTime",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "grade",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "deletedAt",
                        type: "timestamp",
                        isNullable: true,
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

        await queryRunner.createForeignKey(
            "education",
            new TableForeignKey({
                columnNames: ["userid"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("education");
    }
}