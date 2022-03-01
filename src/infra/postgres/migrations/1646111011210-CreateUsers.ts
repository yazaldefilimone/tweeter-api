import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1646111011210 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'users',
            columns: [
                {
                    name:'id',
                    type:'uuid',
                    isUnique:true,
                    isPrimary:true,
                    isNullable:true,
                },
                {
                    name:'name',
                    type:'varchar',
                    isUnique:true
                },
                {
                    name:'username',
                    type:'varchar',
                    isUnique:true,
                    isNullable:true
                },
                {
                    name:'bio',
                    type:'varchar',
                    isUnique:true
                },
                {
                    name:'email',
                    type:'varchar',
                    isUnique:true,
                    isNullable:true
                },
                {
                    name:'password',
                    type:'varchar',
                    isNullable:true
                },
                {
                    name:'born',
                    type:'varchar',
                    isNullable:true
                },
                {
                    name:'created_at',
                    type:'varchar',
                    isNullable:true
                }
            ]
        }))
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
