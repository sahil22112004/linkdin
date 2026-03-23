import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ExperenceMigration1774258095331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
                new Table({
                    name: "experence",
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
                            name: "title",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "employmentType",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "company",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "location",
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
                "experence",
                new TableForeignKey({
                    columnNames: ["userid"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                })
            );
        }
    
        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable("experence");
        }
    }