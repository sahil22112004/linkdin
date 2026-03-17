import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigration1773728310250 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "fullname",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "image",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "coverimage",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "state",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "country",
                        type: "varchar",
                        isNullable: true,
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}